import { CustomFieldType, ParagraphFieldType } from "@/interfaces/form";
import { Input } from "@nextui-org/input";

export default function ParagraphField({
  field,
  value,
  onUpdateValue,
}: {
  value: ParagraphFieldType;
  field: CustomFieldType;
  onUpdateValue: (val: ParagraphFieldType) => void;
}) {
  if (field.isEditing) {
    return (
      <Input
        value={value.value}
        onValueChange={(val) => onUpdateValue({ ...value, value: val })}
        type="string"
        label="Value"
        fullWidth
      />
    );
  } else {
    return <p>{field.paragraphField?.value}</p>;
  }
}
