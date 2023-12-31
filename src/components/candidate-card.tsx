import { ICandidate } from "@/interfaces/candidate";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar } from "@nextui-org/avatar";
import moment from "moment";
import CandidateInfos from "./candidate-infos";
import { Chip, Tooltip } from "@nextui-org/react";
import { Ban, Check } from "lucide-react";

type Props = {
  candidate: ICandidate;
  customClass?: string;
  stageId: string;
};

export default function CandidateCard({
  candidate,
  stageId,
  customClass,
}: Props) {
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
      stageId,
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
            <Avatar className="bg-default-100" name={candidate.firstName} />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-1 items-center">
            <Tooltip
                content={
                  candidate.passedFilter
                    ? "Passed the filter"
                    : "Didn't pass the filter"
                }
              >
                <div
                  className={`rounded-full p-0.5 ${
                    candidate.passedFilter
                      ? "bg-success-100 text-success-800"
                      : "bg-danger-100 text-danger-800"
                  }`}
                >
                  {candidate.passedFilter ? (
                    <Check size={10} />
                  ) : (
                    <Ban size={10} />
                  )}
                </div>
              </Tooltip>
              <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                {candidate.firstName} {candidate.lastName}
              </p>
            </div>
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
