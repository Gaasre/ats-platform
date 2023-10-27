import { Input } from "@nextui-org/input";
import { CustomFieldType, FileFieldType } from "@/interfaces/form";
import { Upload } from "lucide-react";

export default function FileField({
  field,
  value,
  onUpdateValue,
}: {
  value: FileFieldType | undefined;
  field: CustomFieldType;
  onUpdateValue: (val: FileFieldType) => void;
}) {
  console.log(field, value);
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
      <label htmlFor="resume">
        <span className="block text-small font-medium text-foreground pb-1.5">
          {value?.label}
        </span>
        <input type="file" id="resume" className="hidden" />
        <div className="w-full cursor-pointer text-small gap-2 text-foreground-500 flex items-center bg-default-100 hover:bg-default-200 px-3 shadow-sm min-h-unit-10 rounded-medium transition-background duration-150">
          <Upload size={14} /> Attach File
        </div>
      </label>
    );
  }
}
