import { useDroppable } from "@dnd-kit/core";
import ApplicantCard from "./candidate-card";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Stage } from "@/interfaces/stage";
import { Divider } from "@nextui-org/divider";
import { ICandidate } from "@/interfaces/candidate";

type Props = {
  candidates: ICandidate[]
  stage: Stage;
};

export default function StepColumn({
  candidates,
  stage: { title, id, color },
}: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      type: "Column",
    },
  });

  const candidateIds = useMemo(
    () => candidates.map((candidate) => candidate.id),
    [candidates]
  );

  return (
    <div ref={setNodeRef} className="w-[250px] gap-2 flex flex-col h-full">
      <div className="flex gap-2 items-center">
        <div
          className={`p-2 rounded bg-${color}-100 text-${color}-800 text-xs font-bold uppercase`}
        >
          {title}
        </div>
        <div className="w-6 h-6 text-xs font-bold rounded-full bg-foreground-200 text-foreground-800 flex items-center justify-center">
          {candidates.length}
        </div>
      </div>
      <Divider className="my-1"></Divider>
      <div className="h-1/2 flex flex-col py-2 gap-2">
        <SortableContext items={candidateIds}>
          {candidates.map((candidate) => (
            <ApplicantCard key={candidate.id} stageId={id} candidate={candidate} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
