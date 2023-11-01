import { Candidate } from "@/interfaces/candidate";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import moment from "moment";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import CandidateInfos from "./candidate-infos";

type Props = {
  candidate: Candidate;
  customClass?: string;
};

export default function CandidateCard({ candidate, customClass }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
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
        className="rounded w-full shadow border-2 border-primary-400 h-[120px] bg-primary-100"
      ></div>
    );
  }

  return (
    <Card className="rounded" {...attributes} style={style} ref={setNodeRef}>
      <CardBody>
        <div
          className="flex space-x-4 w-full"
          ref={setActivatorNodeRef}
          {...listeners}
        >
          <div className="w-[40px]">
            <Avatar name={candidate.firstName} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {candidate.firstName} {candidate.lastName}
            </p>
            <p className="text-xs text-foreground-500 mb-2">
              {moment(candidate.date).fromNow()}
            </p>
          </div>
        </div>
        <CandidateInfos candidate={candidate} />
      </CardBody>
    </Card>
  );
}
