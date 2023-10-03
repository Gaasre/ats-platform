"use client";

import { Input } from "@nextui-org/input";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { X } from "lucide-react";
import { Select, SelectItem } from "@nextui-org/select";
import { CustomFieldType, DropdownFieldType } from "@/interfaces/form";

export default function DropdownField({
  field,
  value,
  onUpdateValue,
}: {
  value: DropdownFieldType;
  field: CustomFieldType;
  onUpdateValue: (val: DropdownFieldType) => void;
}) {
  const [newChoice, setNewChoice] = useState<string>("");
  if (field.isEditing) {
    return (
      <div className="py-4">
        <Input
          value={value.label}
          onValueChange={(val) => onUpdateValue({ ...value, label: val })}
          type="string"
          label="Title"
          fullWidth
        />

        <div className="w-2/4 mt-4">
          <Listbox aria-label="Choices list" variant="flat">
            {value.value.map((choice, index) => (
              <ListboxItem
                endContent={
                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    size="sm"
                    onClick={() => {
                      onUpdateValue({
                        ...value,
                        value: value.value.filter(
                          (c) => c !== value.value[index]
                        ),
                      });
                    }}
                  >
                    <X size={16} />
                  </Button>
                }
                key={index}
              >
                {choice}
              </ListboxItem>
            ))}
          </Listbox>
        </div>

        <Divider className="my-4"></Divider>

        <div>
          <div className="flex gap-1 items-end">
            <Input
              value={newChoice}
              labelPlacement="outside"
              onValueChange={setNewChoice}
              type="string"
              label="Add a new choice"
              placeholder="Add a new choice"
              fullWidth
            />
            <Button
              variant="flat"
              color="primary"
              isDisabled={newChoice === ""}
              onClick={() => {
                onUpdateValue({
                  ...value,
                  value: [...value.value, newChoice],
                });
                setNewChoice("");
              }}
            >
              Add Choice
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Select
        label={value.label}
        placeholder="Value"
        className="max-w-xs"
        labelPlacement="outside"
      >
        {value.value.map((choice, index) => (
          <SelectItem key={index}>{choice}</SelectItem>
        ))}
      </Select>
    );
  }
}
