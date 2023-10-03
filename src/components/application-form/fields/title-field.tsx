import { Input } from "@nextui-org/input";
import { CustomFieldType, TitleFieldType } from "@/interfaces/form";
import { Divider } from "@nextui-org/divider";

export default function TitleField({
  field,
  value,
  onUpdateValue,
}: {
  value: TitleFieldType;
  field: CustomFieldType;
  onUpdateValue: (val: TitleFieldType) => void;
}) {
  if (field.isEditing) {
    return (
      <Input
        value={value.value}
        onValueChange={(val) => {
          onUpdateValue({ ...value, value: val });
        }}
        type="string"
        label="Value"
        fullWidth
      />
    );
  } else {
    return (
      <div>
        <h2 className="font-semibold text-2xl">{field.titleField?.value}</h2>
        <Divider className="my-4"></Divider>
      </div>
    );
  }
}
