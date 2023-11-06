import { Candidate } from "@/interfaces/candidate";
import { useDroppable } from "@dnd-kit/core";
import { Chip } from "@nextui-org/chip";
import ApplicantCard from "./candidate-card";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Stage } from "@/interfaces/stage";
import { Divider } from "@nextui-org/divider";

type Props = {
  stage: Stage;
};

export default function StepColumn({
  stage: { candidates, title, id, color },
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
        <div className="w-6 h-6 text-xs font-bold rounded-full bg-foreground-200 text-foreground-800 flex items-center justify-center">{candidates.length}</div>
      </div>
      <Divider className="my-1"></Divider>
      <div className="h-1/2 flex flex-col py-2 gap-2">
        <SortableContext items={candidateIds}>
          {candidates.map((candidate) => (
            <ApplicantCard key={candidate.id} candidate={candidate} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
