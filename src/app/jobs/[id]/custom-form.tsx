"use client";

import { CustomFieldType } from "@/interfaces/form";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Orientation } from "@prisma/client";
import React from "react";
import { Upload } from "lucide-react";
import { Divider } from "@nextui-org/divider";
import { Controller, useFormContext } from "react-hook-form";

export default function CustomForm({ form }: { form: CustomFieldType[] }) {
  const { register, control } = useFormContext();

  function renderField(customField: CustomFieldType) {
    switch (customField.valueType) {
      case "RADIO":
        return (
          <RadioGroup
            {...register(customField.id)}
            label={customField.radioField?.label}
            orientation={
              customField.radioField?.orientation == Orientation.VERTICAL
                ? "vertical"
                : "horizontal"
            }
          >
            {customField.radioField?.value.map((choice, index) => (
              <Radio key={index} value={choice}>
                {choice}
              </Radio>
            ))}
          </RadioGroup>
        );
      case "DROPDOWN":
        if (customField.dropdownField) {
          return (
            <Select
              {...register(customField.id)}
              label={customField.dropdownField?.label}
              placeholder="Value"
              className="max-w-xs"
              labelPlacement="outside"
            >
              {customField.dropdownField.value.map((choice, index) => (
                <SelectItem key={index}>{choice}</SelectItem>
              ))}
            </Select>
          );
        } else {
          return "";
        }
      case "FORM":
        return (
          <Input
            {...register(customField.id)}
            label={customField.formField?.label}
            value=""
            labelPlacement="outside"
            placeholder="Value"
            fullWidth
          />
        );
      case "FILE":
        return (
          <Controller
            name={customField.id}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <label htmlFor={customField.id}>
                <span className="block text-small font-medium text-foreground pb-1.5">
                  {customField.fileField?.label}
                </span>
                <input
                  {...field}
                  value={value?.fileName}
                  id={customField.id}
                  onChange={(event) =>
                    onChange(event.target.files ? event.target.files[0] : null)
                  }
                  type="file"
                  className="hidden"
                />
                <div className="w-full cursor-pointer text-small gap-2 text-foreground-500 flex items-center bg-default-100 hover:bg-default-200 px-3 shadow-sm min-h-unit-10 rounded-medium transition-background duration-150">
                  <Upload size={14} /> {value ? value.name : "Attach file"}
                </div>
              </label>
            )}
          ></Controller>
        );
      case "PARAGRAPH":
        return <p>{customField.paragraphField?.value}</p>;
      case "TITLE":
        return (
          <div>
            <h2 className="font-semibold text-2xl">
              {customField.titleField?.value}
            </h2>
            <Divider className="my-4"></Divider>
          </div>
        );
      default:
        return "";
    }
  }

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
      {form.map((field) => (
        <div
          className={`col-span-${
            field.valueType == "TITLE" || field.valueType == "PARAGRAPH"
              ? "2"
              : "1"
          }`}
          key={field.id}
        >
          {renderField(field)}
        </div>
      ))}
    </div>
  );
}
