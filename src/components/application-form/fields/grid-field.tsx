import React from "react";
import {
  CustomFieldType,
  FormFieldType,
  GridFieldType,
} from "@/interfaces/form";
import WrapperField from "./wrapper-field";
import FormField from "./form-field";
import { customFieldsState } from "@/state/application-form-state";
import { useRecoilState } from "recoil";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Plus, PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ValueType } from "@prisma/client";

type Props = {
  field: CustomFieldType;
  value: GridFieldType;
  onUpdateValue: (val: GridFieldType) => void;
};

async function addField(
  jobId: string,
  valueType: ValueType,
  parentGridId: string
): Promise<CustomFieldType> {
  const response = await fetch(`/api/jobs/${jobId}/form`, {
    method: "POST",
    body: JSON.stringify({
      valueType,
      value: {
        parentGridId
      }
    }),
  });
  const data = await response.json();
  return data;
}

export default function GridField({ field, value, onUpdateValue }: Props) {
  const [customFields, setCustomFields] = useRecoilState(customFieldsState);

  const internalValues = value.value.map((v) => v.formField);

  function startEdit(id: string): void {
    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id && f.valueType == ValueType.GRID && f.gridField) {
          const components = f.gridField.value.map((c) => {
            if (c.id === id) {
              return {
                ...c,
                isEditing: true,
              };
            } else {
              return c;
            }
          });
          onUpdateValue({ ...f.gridField, value: components });
          return {
            ...f,
            gridField: {
              ...f.gridField,
              value: components,
            },
          };
        } else {
          return f;
        }
      })
    );
  }

  function cancelEdit(id: string): void {
    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id && f.valueType == ValueType.GRID && f.gridField) {
          const components = f.gridField.value.map((c) => {
            if (c.id === id) {
              return {
                ...c,
                isEditing: false,
              };
            } else {
              return c;
            }
          });
          onUpdateValue({ ...f.gridField, value: components });
          return {
            ...f,
            gridField: {
              ...f.gridField,
              value: components,
            },
          };
        } else {
          return f;
        }
      })
    );
  }

  function goUp(id: string): void {
    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id && f.valueType == ValueType.GRID && f.gridField) {
          const index = f.gridField.value.findIndex((c) => c.id === id);
          const components = [...f.gridField.value];
          if (index > 0) {
            const temp = components[index - 1];
            components[index - 1] = components[index];
            components[index] = temp;
          }
          onUpdateValue({ ...f.gridField, value: components });
          return {
            ...f,
            gridField: {
              ...f.gridField,
              value: components,
            },
          };
        } else {
          return f;
        }
      })
    );
  }

  function goDown(id: string): void {
    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id && f.valueType == ValueType.GRID && f.gridField) {
          const index = f.gridField.value.findIndex((c) => c.id === id);
          const components = [...f.gridField.value];
          if (index < components.length - 1) {
            const temp = components[index + 1];
            components[index + 1] = components[index];
            components[index] = temp;
          }
          onUpdateValue({ ...f.gridField, value: components });
          return {
            ...f,
            gridField: {
              ...f.gridField,
              value: components,
            },
          };
        } else {
          return f;
        }
      })
    );
  }

  function deleteField(id: string): void {
    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id && f.valueType == ValueType.GRID && f.gridField) {
          const newComponents = f.gridField?.value.filter((c) => c.id !== id);
          onUpdateValue({ ...f.gridField, value: newComponents });
          return {
            ...f,
            gridField: {
              ...f.gridField,
              value: newComponents,
            },
          };
        } else {
          return f;
        }
      })
    );
  }

  function setInternalValue(index: number, val: FormFieldType): void {
    const newInternalValues = [...value.value];
    newInternalValues[index] = {
      ...newInternalValues[index],
      formField: val,
    };
    onUpdateValue({ ...value, value: newInternalValues });
  }

  function confirmEdit(id: string, value: FormFieldType | undefined): void {
    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id && f.valueType == ValueType.GRID && f.gridField) {
          const newComponents = f.gridField.value.map((c) => {
            if (c.id === id) {
              return {
                ...c,
                isEditing: false,
                formField: value,
              };
            } else {
              return c;
            }
          });
          onUpdateValue({ ...f.gridField, value: newComponents });
          return {
            ...f,
            gridField: {
              ...f.gridField,
              value: newComponents,
            },
          };
        } else {
          return f;
        }
      })
    );
  }

  async function newField() {
    const newField: CustomFieldType = {
      id: uuidv4(),
      valueType: ValueType.FORM,
      formField: {
        label: "New Field",
      },
      isEditing: false,
    };

    const newField2 = await addField(field.id, ValueType.FORM, field.id)

    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id && f.valueType == ValueType.GRID && f.gridField) {
          const newComponents = [...f.gridField.value, newField];
          onUpdateValue({ ...f.gridField, value: newComponents });
          return {
            ...f,
            gridField: {
              ...f.gridField,
              value: newComponents,
            },
          };
        } else {
          return f;
        }
      })
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {field.gridField?.value.map((component, index) => (
          <WrapperField
            key={component.id}
            isEditing={component.isEditing}
            cancelEdit={() => cancelEdit(component.id)}
            confirmEdit={() => confirmEdit(component.id, internalValues[index])}
            startEdit={() => startEdit(component.id)}
            deleteField={() => deleteField(component.id)}
            goUp={() => goUp(component.id)}
            goDown={() => goDown(component.id)}
          >
            <FormField
              value={internalValues[index]}
              onUpdateValue={(value) => setInternalValue(index, value)}
              field={component}
            />
          </WrapperField>
        ))}
      </div>
      {field.isEditing ? (
        <div className="mb-2">
          <Button onClick={newField} fullWidth color="default" variant="flat">
            <Plus size={16} />
            New Field
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
