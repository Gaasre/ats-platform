import GeneralField from "./fields/general-field";
import { useRecoilState } from "recoil";
import { customFieldsState } from "@/state/application-form-state";
import { Button } from "@nextui-org/button";
import {
  Columns,
  FormInput,
  Heading2,
  LayoutList,
  Paperclip,
  PlusCircle,
  Type,
  Upload,
} from "lucide-react";
import { Divider } from "@nextui-org/divider";
import { Orientation, ValueType } from "@prisma/client";
import { CustomFieldType } from "@/interfaces/form";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Input } from "@nextui-org/input";

async function newField(
  jobId: string,
  valueType: ValueType
): Promise<CustomFieldType> {
  const response = await fetch(`/api/jobs/${jobId}/form`, {
    method: "POST",
    body: JSON.stringify({
      valueType,
    }),
  });
  const data = await response.json();
  return data;
}

async function getFields(jobId: string) {
  const response = await fetch(`/api/jobs/${jobId}/form`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export default function ApplicationForm({ jobId }: { jobId: string }) {
  const [fields, setFields] = useRecoilState(customFieldsState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFields(jobId).then((data) => {
      setFields(data);
      setIsLoading(false);
    });
  }, []);

  async function newParagraphField() {
    const data = await newField(jobId, ValueType.PARAGRAPH);
    setFields([...fields, { ...data, isEditing: false }]);
  }

  // async function newGridField() {
  //   const data = await newField(jobId, ValueType.GRID);
  //   setFields([...fields, { ...data, isEditing: false }]);
  // }

  async function newFormField() {
    const data = await newField(jobId, ValueType.FORM);
    setFields([...fields, { ...data, isEditing: false }]);
  }

  async function newChoiceField() {
    const data = await newField(jobId, ValueType.RADIO);
    setFields([...fields, { ...data, isEditing: false }]);
  }

  async function newTitleField() {
    const data = await newField(jobId, ValueType.TITLE);
    setFields([...fields, { ...data, isEditing: false }]);
  }

  async function newDropdownField() {
    const data = await newField(jobId, ValueType.DROPDOWN);
    setFields([...fields, { ...data, isEditing: false }]);
  }

  return (
    <div className="p-4">
      <h1 className="text-xl mb-8">Customize Application Form</h1>
      <div className="flex gap-4">
        <div className="flex gap-1 flex-col flex-1">
          {/* This is the default form that you can't edit */}
          <div className="grid grid-cols-2 gap-8 px-6 mb-8">
            <Input
              type="text"
              label="First Name"
              labelPlacement="outside"
              placeholder="First Name"
            />
            <Input
              type="text"
              label="Last Name"
              labelPlacement="outside"
              placeholder="Last Name"
            />
            <Input
              type="email"
              label="Email"
              labelPlacement="outside"
              placeholder="Email"
            />
            <Input
              type="tel"
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Phone Number"
            />
            <label htmlFor="resume">
              <span className="block text-small font-medium text-foreground pb-1.5">
                Résume
              </span>
              <input type="file" id="resume" className="hidden" />
              <div className="w-full cursor-pointer text-small gap-2 text-foreground-500 flex items-center bg-default-100 hover:bg-default-200 px-3 shadow-sm min-h-unit-10 rounded-medium transition-background duration-150">
                <Upload size={14} /> Attach File
              </div>
            </label>
          </div>
          {isLoading ? (
            <Spinner label="Loading the custom fields" color="primary" labelColor="primary" />
          ) : (
            fields.map((field) => (
              <GeneralField
                jobId={jobId}
                field={field}
                key={field.id}
              ></GeneralField>
            ))
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium">General Fields</h3>
          <Divider className="my-2"></Divider>
          <div className="p-4 grid grid-cols-2 gap-2 h-fit">
            {/* <Button
              variant="flat"
              onClick={newGridField}
              startContent={<Columns size={16} />}
            >
              Group Field
            </Button> */}
            <Button
              variant="flat"
              onClick={newTitleField}
              startContent={<Heading2 size={16} />}
            >
              Title Field
            </Button>
            <Button
              variant="flat"
              onClick={newParagraphField}
              startContent={<Type size={16} />}
            >
              Paragraph
            </Button>
            <Button
              variant="flat"
              onClick={newFormField}
              startContent={<FormInput size={16} />}
            >
              Form Field
            </Button>
            <Button
              variant="flat"
              onClick={newChoiceField}
              startContent={<Columns size={16} />}
            >
              Radio Field
            </Button>
            <Button
              variant="flat"
              onClick={newDropdownField}
              startContent={<LayoutList size={16} />}
            >
              Dropdown Field
            </Button>
          </div>
          <h3 className="text-lg font-medium">Special Fields</h3>
          <Divider className="my-2"></Divider>
        </div>
      </div>
    </div>
  );
}
