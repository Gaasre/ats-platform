import { Tooltip } from "@nextui-org/tooltip";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { FileEdit, Trash } from "lucide-react";

export default function NoteItem() {
  return (
    <div className="px-4">
      <div className="flex gap-4 group">
        <div>
          <Avatar name="Junior" />
        </div>
        <div>
          <p className="font-semibold text-sm">Screening schedule change</p>
          <Tooltip content="1st Jun, 2024 at 13:40">
            <p className="text-xs font-semibold text-foreground-500 w-fit">
              1 day ago
            </p>
          </Tooltip>
          <p className="text-sm mt-2q">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Id cumque
            quia exercitationem quasi.
          </p>
        </div>
        <div className="space-y-2 opacity-0 group-hover:opacity-100 duration-200 transition-all">
          <Button
            size="sm"
            isIconOnly
            variant="flat"
            color="default"
            aria-label="Edit"
          >
            <FileEdit size={16} />
          </Button>
          <Button
            size="sm"
            isIconOnly
            variant="flat"
            color="danger"
            aria-label="Delete"
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
      <Divider className="my-4" />
    </div>
  );
}
