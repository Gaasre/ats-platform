import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Mail, Pencil, Save, StickyNote, Trash } from "lucide-react";
import { Action, ActionType, EmailTemplate, Note } from "@prisma/client";

function ActionItem({
  action,
}: {
  action: Action & { emailTemplate: EmailTemplate; note: Note };
}) {
  return (
    <>
      <div className="flex items-center rounded-md border border-default-200 py-3 px-4 space-x-2 mb-2">
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
              Send <b>{action.emailTemplate.name}</b> to the <b>candidate</b>
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
          >
            <Pencil size={14} />
          </Button>
          <Button size="sm" isIconOnly color="danger" variant="light">
            <Trash size={14} />
          </Button>
        </div>
      </div>
    </>
  );
}

export default ActionItem;
