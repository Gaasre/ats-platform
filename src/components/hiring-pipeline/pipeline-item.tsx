import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import {
  Lock,
  GripVertical,
  Mail,
  MoreVertical,
  Pencil,
  Plus,
  StickyNote,
  Trash,
  Workflow,
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
import NewEmailAction from "./email/new-email-action";
import { Action, EmailTemplate, Note } from "@prisma/client";
import { Badge, Chip } from "@nextui-org/react";

type Props = {
  id: string;
  title: string;
  color: string;
  jobId: string;
  stageId: string;
  isEditing: boolean;
  order: number;
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

async function getActions(
  jobId: string,
  stageId: string
): Promise<(Action & { emailTemplate: EmailTemplate; note: Note })[]> {
  const req = await fetch(
    `http://localhost:3000/api/dashboard/jobs/${jobId}/stage/${stageId}/action`,
    {
      method: "GET",
    }
  );

  const res = await req.json();
  return res;
}

export default function PipelineItem({
  id,
  title,
  color,
  isEditing,
  order,
  setIsEditing,
  jobId,
  stageId,
  onDelete,
  onConfirm,
}: Props) {
  const [internalTitle, setInternalTitle] = useState(title);
  const [internalColor, setInternalColor] = useState(color);
  const [isEditingActions, setIsEditingActions] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const [newEmailActionOpen, setNewEmailActionOpen] = useState(false);
  const [actions, setActions] = useState<
    (Action & { emailTemplate: EmailTemplate; note: Note })[]
  >([]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const loadActions = async () => {
    const data = await getActions(jobId, stageId);
    setActions(data ? data : []);
  };

  const editActions = async () => {
    await loadActions();
    setIsEditingActions(!isEditingActions);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="cursor-default"
    >
      <Card
        className={`rounded-md w-full ${
          isEditing || isEditingActions
            ? `border-2 border-${internalColor}`
            : "border"
        } ${
          order == 0 ? "bg-foreground-100 text-foreground-500" : ""
        } shadow select-none`}
      >
        <CardBody className="py-2.5 overflow-hidden">
          <div className="flex items-center gap-2">
            {order == 0 ? (
              <Lock size={16} className="text-foreground-500" />
            ) : (
              <GripVertical
                className="cursor-move mr-2 text-default-600"
                {...listeners}
                size={16}
              />
            )}
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
                <DropdownMenu
                  variant="faded"
                  aria-label="Stage Dropdown"
                  disabledKeys={
                    order == 0 ? ["edit", "edit-actions", "delete"] : []
                  }
                >
                  <DropdownItem
                    startContent={<Pencil size={14} />}
                    onClick={() => setIsEditing(!isEditing)}
                    key="edit"
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    startContent={<Workflow size={14} />}
                    onPress={editActions}
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
                  {actions.map((action) => (
                    <ActionItem
                      onDelete={() =>
                        setActions(actions.filter((a) => a.id != action.id))
                      }
                      key={action.id}
                      action={action}
                      onEdit={loadActions}
                    />
                  ))}
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
                        onClick={() => setNewEmailActionOpen(true)}
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
                        <Chip
                          size="sm"
                          color="warning"
                          variant="flat"
                          className="ml-2"
                        >
                          Soon
                        </Chip>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <AnimatePresence>
                  {newEmailActionOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <NewEmailAction
                        jobId={jobId}
                        stageId={stageId}
                        onNew={loadActions}
                        onClose={() => setNewEmailActionOpen(false)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <Divider className="my-4"></Divider>
                <div className="flex gap-1 mt-2">
                  <Button
                    variant="light"
                    size="sm"
                    color="danger"
                    aria-label="Cancel"
                    onClick={() => {
                      setIsEditingActions(!isEditingActions);
                      setActions([]);
                      setNewEmailActionOpen(false);
                    }}
                  >
                    Close
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
