import { Orientation, ValueType } from "@prisma/client";

export type CustomFieldType = {
  id: string;
  valueType: ValueType;
  isEditing: boolean;
  formField?: FormFieldType;
  titleField?: TitleFieldType;
  paragraphField?: ParagraphFieldType;
  radioField?: RadioFieldType;
  dropdownField?: DropdownFieldType;
  gridField?: GridFieldType;
};

export type FormFieldType = {
  label: string;
};

export type TitleFieldType = {
  value: string;
};

export type ParagraphFieldType = {
  value: string;
};

export type RadioFieldType = {
  label: string;
  orientation: Orientation;
  value: string[];
};

export type DropdownFieldType = {
  label: string;
  value: string[];
};

export type GridFieldType = {
  value: CustomFieldType[];
};
