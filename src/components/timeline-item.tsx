import { Check } from "lucide-react";
import { Tooltip } from "@nextui-org/tooltip";

export default function TimelineItem() {
  return (
    <div className="relative flex items-center py-2">
      <div className="absolute -left-11 z-10 h-6 w-6 rounded-full text-primary-800 bg-primary flex items-center justify-center p-1">
        <Check size={14} />
      </div>
      <div>
        <Tooltip content="1st Jun, 2024 at 13:40">
          <p className="text-xs font-semibold text-foreground-500 w-fit">1 day ago</p>
        </Tooltip>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
}
