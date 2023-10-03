import { Button, ButtonGroup } from "@nextui-org/button";
import { Check, ChevronDown, ChevronUp, Pencil, Trash, X } from "lucide-react";

export default function WrapperField({
  children,
  isEditing,
  cancelEdit,
  confirmEdit,
  startEdit,
  deleteField,
  goUp,
  goDown,
}: {
  children: React.ReactNode;
  isEditing: boolean;
  confirmEdit: () => void;
  cancelEdit: () => void;
  startEdit: () => void;
  deleteField: () => void;
  goUp: () => void;
  goDown: () => void;
}) {
  return (
    <div className="w-full py-2 px-2 rounded-md flex items-center group border-1 border-transparent transition-all hover:border-foreground-200 gap-2">
      <div className="flex items-center gap-2 flex-1">
        <div className="opacity-0 group-hover:opacity-100 transition-all flex flex-col">
          <Button isIconOnly variant="light" size="sm" aria-label="Go Up" onClick={goUp}>
            <ChevronUp size={14} />
          </Button>
          <Button isIconOnly variant="light" size="sm" aria-label="Go Down" onClick={goDown}>
            <ChevronDown size={14} />
          </Button>
        </div>
        <div className="flex-1">{children}</div>
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-all">
        {isEditing ? (
          <div className="flex flex-col gap-1">
            <Button
              isIconOnly
              variant="light"
              color="success"
              size="sm"
              aria-label="Confirm"
              onClick={confirmEdit}
            >
              <Check size={14} />
            </Button>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              aria-label="Cancel"
              onClick={cancelEdit}
            >
              <X size={14} />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              aria-label="Edit Field"
              onClick={startEdit}
            >
              <Pencil size={14} />
            </Button>
            <Button
              isIconOnly
              variant="light"
              color="danger"
              size="sm"
              aria-label="Delete Field"
              onClick={deleteField}
            >
              <Trash size={14} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
