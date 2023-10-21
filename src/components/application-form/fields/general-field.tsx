import FormField from "./form-field";
import ParagraphField from "./paragraph-field";
import WrapperField from "./wrapper-field";
import { useState } from "react";
import GridField from "./grid-field";
import { useRecoilState } from "recoil";
import { customFieldsState } from "@/state/application-form-state";
import TitleField from "./title-field";
import ChoiceField from "./choice-field";
import DropdownField from "./dropdown-field";
import {
  CustomFieldType,
  DropdownFieldType,
  FormFieldType,
  GridFieldType,
  ParagraphFieldType,
  RadioFieldType,
  TitleFieldType,
} from "@/interfaces/form";
import { RadioField, ValueType } from "@prisma/client";
import { omit } from "lodash";

type Props = {
  field: CustomFieldType;
  jobId: string;
};

async function deleteRequest(jobId: string, fieldId: string) {
  const response = await fetch(`/api/jobs/${jobId}/form/${fieldId}`, {
    method: "DELETE",
  });
  console.log(response);
  const data = await response.json();
  return data;
}

async function editRequest(jobId: string, fieldId: string, value: any) {
  const response = await fetch(`/api/jobs/${jobId}/form/${fieldId}`, {
    method: "PUT",
    body: JSON.stringify(value),
  });
  const data = await response.json();
  return { data, status: response.status };
}

export default function GeneralField({ field, jobId }: Props) {
  const [customFields, setCustomFields] = useRecoilState(customFieldsState);

  async function confirmEdit(
    newValue:
      | FormFieldType
      | ParagraphFieldType
      | TitleFieldType
      | DropdownFieldType
      | RadioFieldType
      | GridFieldType
      | undefined
  ) {
    const fields = await Promise.all(
      customFields.map(async (f) => {
        if (f.id === field.id) {
          switch (f.valueType) {
            case ValueType.PARAGRAPH:
              var { status } = await editRequest(jobId, field.id, {
                valueType: ValueType.PARAGRAPH,
                value: omit(newValue, ["customFieldId"]),
              });
              if (status === 200) {
                return {
                  ...f,
                  paragraphField: newValue as ParagraphFieldType,
                  isEditing: false,
                };
              } else {
                return f;
              }
            case ValueType.TITLE:
              var { status } = await editRequest(jobId, field.id, {
                valueType: ValueType.TITLE,
                value: omit(newValue, ["customFieldId"]),
              });
              if (status === 200) {
                return {
                  ...f,
                  titleField: newValue as TitleFieldType,
                  isEditing: false,
                };
              } else {
                return f;
              }
            case ValueType.FORM:
              var { status } = await editRequest(jobId, field.id, {
                valueType: ValueType.FORM,
                value: omit(newValue, ["customFieldId"]),
              });
              if (status === 200) {
                return {
                  ...f,
                  formField: newValue as FormFieldType,
                  isEditing: false,
                };
              } else {
                return f;
              }
            case ValueType.GRID:
              return {
                ...f,
                gridField: newValue as GridFieldType,
                isEditing: false,
              };
            case ValueType.RADIO:
              var { status } = await editRequest(jobId, field.id, {
                valueType: ValueType.RADIO,
                value: omit(newValue, ["customFieldId"]),
              });
              if (status === 200) {
                return {
                  ...f,
                  radioField: newValue as RadioFieldType,
                  isEditing: false,
                };
              } else {
                return f;
              }
            case ValueType.DROPDOWN:
              var { status } = await editRequest(jobId, field.id, {
                valueType: ValueType.DROPDOWN,
                value: omit(newValue, ["customFieldId"]),
              });
              if (status === 200) {
                return {
                  ...f,
                  dropdownField: newValue as DropdownFieldType,
                  isEditing: false,
                };
              } else {
                return f;
              }
          }
        }
        return f;
      })
    );

    console.log(fields);

    setCustomFields(fields);
  }

  //TODO:Need to update on server
  function goUp(): void {
    // Find the index of the current field in customFields
    const currentIndex = customFields.findIndex((f) => f.id === field.id);
    // If the current field is not the first field
    if (currentIndex > 0) {
      const updatedFields = [...customFields];
      // Swap the current field with the one above it
      [updatedFields[currentIndex], updatedFields[currentIndex - 1]] = [
        updatedFields[currentIndex - 1],
        updatedFields[currentIndex],
      ];

      setCustomFields(updatedFields);
    }
  }

  async function deleteField() {
    const data = await deleteRequest(jobId, field.id);
    if (!data.error) {
      setCustomFields(customFields.filter((f) => f.id !== field.id));
    }
  }

  function startEdit(): void {
    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id) {
          return {
            ...f,
            isEditing: true,
          };
        } else {
          return f;
        }
      })
    );
  }

  //TODO:Need to update on server
  function goDown(): void {
    // Find the index of the current field in customFields
    const currentIndex = customFields.findIndex((f) => f.id === field.id);
    // If the current field is not the first field
    if (currentIndex < customFields.length - 1) {
      const updatedFields = [...customFields];
      // Swap the current field with the one below it
      [updatedFields[currentIndex], updatedFields[currentIndex + 1]] = [
        updatedFields[currentIndex + 1],
        updatedFields[currentIndex],
      ];

      setCustomFields(updatedFields);
    }
  }

  function cancelEdit(): void {
    setCustomFields(
      customFields.map((f) => {
        if (f.id === field.id) {
          return {
            ...f,
            isEditing: false,
          };
        } else {
          return f;
        }
      })
    );
  }

  // Initialize internalValue based on field type
  const initialInternalValue = (() => {
    if (field.valueType === ValueType.PARAGRAPH) {
      return field.paragraphField;
    } else if (field.valueType === ValueType.TITLE) {
      return field.titleField;
    } else if (field.valueType === ValueType.FORM) {
      return field.formField;
    } else if (field.valueType === ValueType.RADIO) {
      return field.radioField;
    } else if (field.valueType === ValueType.DROPDOWN) {
      return field.dropdownField;
    } else if (field.valueType === ValueType.GRID) {
      return field.gridField;
    }
  })();

  const [internalValue, setInternalValue] = useState<
    | FormFieldType
    | ParagraphFieldType
    | TitleFieldType
    | DropdownFieldType
    | RadioFieldType
    | GridFieldType
    | undefined
  >(initialInternalValue);

  return (
    <WrapperField
      isEditing={field.isEditing}
      cancelEdit={() => {
        cancelEdit();
        setInternalValue(initialInternalValue);
      }}
      confirmEdit={() => confirmEdit(internalValue)}
      startEdit={startEdit}
      deleteField={deleteField}
      goUp={goUp}
      goDown={goDown}
    >
      {field.valueType == ValueType.PARAGRAPH ? (
        <ParagraphField
          field={field}
          value={internalValue as ParagraphFieldType}
          onUpdateValue={setInternalValue}
        ></ParagraphField>
      ) : field.valueType == ValueType.FORM ? (
        <FormField
          field={field}
          value={internalValue as FormFieldType}
          onUpdateValue={setInternalValue}
        ></FormField>
      ) : field.valueType == ValueType.GRID ? (
        <GridField
          field={field}
          value={internalValue as GridFieldType}
          onUpdateValue={setInternalValue}
        ></GridField>
      ) : field.valueType == ValueType.TITLE ? (
        <TitleField
          field={field}
          value={internalValue as TitleFieldType}
          onUpdateValue={setInternalValue}
        ></TitleField>
      ) : field.valueType == ValueType.RADIO ? (
        <ChoiceField
          field={field}
          value={internalValue as RadioFieldType}
          onUpdateValue={setInternalValue}
        ></ChoiceField>
      ) : field.valueType == ValueType.DROPDOWN ? (
        <DropdownField
          field={field}
          value={internalValue as DropdownFieldType}
          onUpdateValue={setInternalValue}
        ></DropdownField>
      ) : (
        ""
      )}
    </WrapperField>
  );
}
