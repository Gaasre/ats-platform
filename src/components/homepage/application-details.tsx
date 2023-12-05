import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import {
  Upload,
  Lock,
  Heading2,
  Type,
  FormInput,
  Columns,
  LayoutList,
  File,
} from "lucide-react";
import React from "react";
import { Divider } from "@nextui-org/divider";
import { motion } from "framer-motion";

export default function ApplicationDetails() {
  return (
    <motion.div className="p-4">
      <h1 className="text-xl mb-8">Customize Application Form</h1>
      <div className="flex gap-8">
        <div>
          <div className="relative px-12 py-6 mb-8 border rounded-lg transition-colors rounded-tr-none flex-1">
            <div className="absolute -top-6 -right-px bg-default-200 text-default-600 rounded-t-lg px-2 py-1 text-xs flex gap-1 items-center font-medium">
              <Lock size={12} /> locked
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
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
          </div>
          <div className="p-4 border border-transparent hover:border-default rounded-lg transition-all">
            <Input
              type="text"
              label="Title"
              value="What's your salary expectations ?"
              placeholder="Title"
              className="mb-2"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" color="danger" variant="light">
                Cancel
              </Button>
              <Button size="sm" color="success" variant="flat">
                Confirm
              </Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium">Available Fields</h3>
          <Divider className="my-2"></Divider>
          <div className="p-4  grid grid-cols-2 gap-2">
            <Button variant="flat" startContent={<Heading2 size={16} />}>
              Title Field
            </Button>
            <Button variant="flat" startContent={<Type size={16} />}>
              Paragraph
            </Button>
            <Button variant="flat" startContent={<FormInput size={16} />}>
              Form Field
            </Button>
            <Button variant="flat" startContent={<Columns size={16} />}>
              Radio Field
            </Button>
            <Button variant="flat" startContent={<LayoutList size={16} />}>
              Dropdown Field
            </Button>
            <Button variant="flat" startContent={<File size={16} />}>
              File
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
