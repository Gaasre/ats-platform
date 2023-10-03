"use client";

import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Columns, Rows, X } from "lucide-react";
import { Switch } from "@nextui-org/switch";
import { CustomFieldType, RadioFieldType } from "@/interfaces/form";
import { Orientation } from "@prisma/client";

export default function ChoiceField({
  field,
  value,
  onUpdateValue,
}: {
  value: RadioFieldType;
  field: CustomFieldType;
  onUpdateValue: (val: RadioFieldType) => void;
}) {
  const [newChoice, setNewChoice] = useState<string>("");
  if (field.isEditing) {
    return (
      <div className="py-4">
        <div className="flex gap-2 items-center">
          <Input
            value={value.label}
            onValueChange={(val) => onUpdateValue({ ...value, label: val })}
            type="string"
            label="Title"
            fullWidth
          />
          <Switch
            size="sm"
            color="primary"
            startContent={<Rows />}
            endContent={<Columns />}
            isSelected={value.orientation === Orientation.VERTICAL}
            onValueChange={() =>
              onUpdateValue({
                ...value,
                orientation:
                  value.orientation === Orientation.VERTICAL
                    ? Orientation.HORIZONTAL
                    : Orientation.VERTICAL,
              })
            }
          >
            {value.orientation === Orientation.VERTICAL
              ? Orientation.VERTICAL
              : Orientation.HORIZONTAL}
          </Switch>
        </div>

        <div className="w-2/4 mt-4">
          <Listbox aria-label="Single selection example" variant="flat">
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
      <RadioGroup
        label={value.label}
        orientation={
          value.orientation == Orientation.VERTICAL ? "vertical" : "horizontal"
        }
      >
        {value.value.map((choice, index) => (
          <Radio key={index} value={choice}>
            {choice}
          </Radio>
        ))}
      </RadioGroup>
    );
  }
}
