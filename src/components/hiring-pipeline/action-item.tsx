import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Mail, Pencil, Save, StickyNote, Trash } from "lucide-react";
import { Action, ActionType, EmailTemplate, Note } from "@prisma/client";
import { useState } from "react";
import EditEmailAction from "./email/edit-email-action";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";

async function deleteEmailAction(id: string): Promise<{ status: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/action/${id}`, {
    method: "DELETE",
  });

  const res = await req.json();
  return res;
}

function ActionItem({
  action,
  onEdit,
  onDelete,
}: {
  action: Action & { emailTemplate: EmailTemplate; note: Note };
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const deleteAction = async () => {
    setLoading(true);
    const data = await deleteEmailAction(action.id);
    if (data.status == "success") {
      onDelete();
    }
    onClose();
    setLoading(false);
  };

  if (editing) {
    return (
      <EditEmailAction
        action={action}
        onClose={() => setEditing(false)}
        onEdit={onEdit}
      />
    );
  } else {
    return (
      <div className="flex items-center rounded-md border border-default-200 py-3 px-4 space-x-2 mb-2">
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Delete job posting
                </ModalHeader>
                <ModalBody>
                  <p>
                    This action is irreversible. Are you sure you want to delete
                    the job posting ?
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    isLoading={loading}
                    color="danger"
                    onPress={deleteAction}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        <Chip
          color={action.type == ActionType.EMAIL ? "warning" : "danger"}
          size="sm"
          variant="flat"
        >
          {action.type == ActionType.EMAIL ? (
            <Mail size={14} />
          ) : (
            <StickyNote size={14} />
          )}
        </Chip>
        <div className="text-sm flex-1">
          {action.type == ActionType.EMAIL ? (
            <p>
              Send <b>{action.emailTemplate?.name}</b> to the <b>candidate</b>
            </p>
          ) : (
            <p>
              Add <b>{action.note.content}</b> as a note
            </p>
          )}
        </div>
        <div>
          <Button
            size="sm"
            isIconOnly
            color="default"
            className="text-default-500"
            variant="light"
            onClick={() => setEditing(true)}
          >
            <Pencil size={14} />
          </Button>
          <Button
            onClick={onOpen}
            size="sm"
            isIconOnly
            color="danger"
            variant="light"
          >
            <Trash size={14} />
          </Button>
        </div>
      </div>
    );
  }
}

export default ActionItem;
