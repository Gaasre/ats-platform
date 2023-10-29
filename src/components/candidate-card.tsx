import { Candidate } from "@/interfaces/candidate";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import { Divider } from "@nextui-org/divider";
import { File } from "lucide-react";

type Props = {
  candidate: Candidate;
  customClass?: string;
};

export default function CandidateCard({ candidate, customClass }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: candidate.id,
    data: {
      type: "Candidate",
      candidate,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="rounded-xl w-full p-2 shadow border-2 border-primary-400 h-[105px] bg-primary-100"
      ></div>
    );
  }

  return (
    <Card ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Avatar name={candidate.firstName} />
          <div>
            <p className="font-semibold">
              {candidate.firstName} {candidate.lastName}
            </p>
            <p className="text-xs text-foreground-500">2 days ago</p>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter>
        <div className="flex gap-1 items-center flex-row-reverse w-full px-2">
          <File size={14} />
          <p className="text-xs font-semibold">2</p>
        </div>
      </CardFooter>
    </Card>
  );
}
