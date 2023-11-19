"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  MoreVertical,
  Pencil,
  Plus,
  StickyNote,
  Trash,
  Workflow,
  X,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { AnimatePresence, motion } from "framer-motion";
import { Divider } from "@nextui-org/divider";
import ActionItem from "./action-item";

type Props = {
  id: string;
  title: string;
  color: string;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onDelete: () => void;
  onConfirm: (title: string, color: string) => void;
};

const colors = [
  { id: "danger", name: "Red" },
  { id: "warning", name: "Yellow" },
  { id: "default", name: "Gray" },
  { id: "primary", name: "Blue" },
  { id: "success", name: "Green" },
];

export default function PipelineItem({
  id,
  title,
  color,
  isEditing,
  setIsEditing,

  onDelete,
  onConfirm,
}: Props) {
  const [internalTitle, setInternalTitle] = useState(title);
  const [internalColor, setInternalColor] = useState(color);
  const [isEditingActions, setIsEditingActions] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className={`rounded-md w-full ${
          isEditing || isEditingActions
            ? `border-2 border-${internalColor}`
            : "border"
        } shadow`}
      >
        <CardBody className="py-2.5 overflow-hidden">
          <div className="flex items-center gap-2">
            {isEditing ? (
              <div className="flex gap-4 w-full">
                <Input
                  value={internalTitle}
                  size="sm"
                  onValueChange={(val) => setInternalTitle(val)}
                  type="string"
                  label="Value"
                  className="flex-1"
                />
                <Select
                  label="Color"
                  size="sm"
                  placeholder="Select a color"
                  className="max-w-xs"
                  startContent={
                    <div
                      className={`bg-${internalColor} h-3 w-3 rounded`}
                    ></div>
                  }
                  selectedKeys={[internalColor]}
                  onChange={(e) => {
                    console.log(e);
                    setInternalColor(e.target.value);
                  }}
                >
                  {colors.map((color) => (
                    <SelectItem
                      key={color.id}
                      startContent={
                        <div className={`bg-${color.id} h-3 w-3 rounded`}></div>
                      }
                      value={color.id}
                    >
                      {color.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            ) : (
              <>
                <div className={`bg-${internalColor} h-4 w-4 rounded-md`}></div>
                <p className="flex-1 text-sm font-medium">{internalTitle}</p>
              </>
            )}
            {isEditing ? (
              <div className="flex gap-1">
                <Button
                  variant="light"
                  size="sm"
                  aria-label="Confirm"
                  onClick={() => onConfirm(internalTitle, internalColor)}
                >
                  Save
                </Button>
                <Button
                  variant="light"
                  size="sm"
                  color="danger"
                  aria-label="Cancel"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setInternalTitle(title);
                    setInternalColor(color);
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Stage Dropdown">
                  <DropdownItem
                    startContent={<Pencil size={14} />}
                    onClick={() => setIsEditing(!isEditing)}
                    key="edit"
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    startContent={<Workflow size={14} />}
                    onClick={() => setIsEditingActions(!isEditingActions)}
                    key="edit-actions"
                  >
                    Edit Actions
                  </DropdownItem>
                  <DropdownItem
                    startContent={<Trash size={14} />}
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={onDelete}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
          </div>
          <AnimatePresence>
            {isEditingActions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="my-4">
                  <ActionItem />
                </div>
                <div className="flex flex-row-reverse">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        size="sm"
                        startContent={<Plus size={16} />}
                        variant="flat"
                        color="primary"
                      >
                        Add Action
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem
                        startContent={<Mail size={16} />}
                        key="send-email"
                      >
                        Send Email
                      </DropdownItem>
                      <DropdownItem
                        startContent={<StickyNote size={16} />}
                        key="add-note"
                      >
                        Add Note
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <Divider className="my-4"></Divider>
                <div className="flex gap-1 mt-2">
                  <Button
                    variant="light"
                    size="sm"
                    aria-label="Confirm"
                    onClick={() => setIsEditingActions(!isEditingActions)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    color="danger"
                    aria-label="Cancel"
                    onClick={() => {
                      setIsEditingActions(!isEditingActions);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardBody>
      </Card>
    </div>
  );
}
