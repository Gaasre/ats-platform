import { Input } from "@nextui-org/input";
import { CustomFieldType, FormFieldType } from "@/interfaces/form";

export default function FormField({
  field,
  value,
  onUpdateValue,
}: {
  value: FormFieldType | undefined;
  field: CustomFieldType;
  onUpdateValue: (val: FormFieldType) => void;
}) {
  if (field.isEditing) {
    return (
      <Input
        value={value?.label}
        onValueChange={(val) => onUpdateValue({ label: val })}
        label="Value"
        fullWidth
      />
    );
  } else {
    return (
      <Input
        label={value?.label}
        value=""
        labelPlacement="outside"
        placeholder="Value"
        fullWidth
      />
    );
  }
}
