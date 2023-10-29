import { Candidate } from "@/interfaces/candidate";
import { useDroppable } from "@dnd-kit/core";
import { Chip } from "@nextui-org/chip";
import ApplicantCard from "./candidate-card";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Stage } from "@/interfaces/stage";

type Props = {
  stage: Stage;
  active: boolean;
};

export default function StepColumn({
  stage: { candidates, title, id },
  active,
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
      <Card
        className={`border-t-primary-500 border-t-4 ${
          isOver ? "scale-110" : ""
        }`}
      >
        <CardHeader>
          <div className="flex items-center justify-between w-full text-sm px-2">
            <p className="select-none font-semibold">{title}</p>
            <Chip color="default" variant="flat" size="sm">
              {candidates.length}
            </Chip>
          </div>
        </CardHeader>
      </Card>
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
