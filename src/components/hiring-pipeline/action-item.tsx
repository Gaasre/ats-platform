import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Mail, Pencil, Save, Trash } from "lucide-react";

function ActionItem() {
  return (
    <>
      <div className="flex items-center rounded-md border border-default-200 py-3 px-4 space-x-2 mb-2">
        <Chip color="warning" size="sm" variant="flat">
          <Mail size={14} />
        </Chip>
        <p className="text-sm flex-1">
          Send an <b>email</b> to <b>Candidate</b>
        </p>
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
