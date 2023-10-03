import { Applicant } from "@/interfaces/applicant";
import { useDroppable } from "@dnd-kit/core";
import { Chip } from "@nextui-org/chip";
import ApplicantCard from "./applicant-card";
import { SortableContext } from "@dnd-kit/sortable";
import { useMemo } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

type Props = {
  id: number;
  name: string;
  length: number;
  applicants: Applicant[];
};

export default function StepColumn({ applicants, name, length, id }: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      type: "Column",
    },
  });

  const applicantIds = useMemo(
    () => applicants.map((applicant) => applicant.id),
    [applicants]
  );

  return (
    <div ref={setNodeRef} className="w-[250px] gap-2 flex flex-col h-full">
      <Card className="border-t-primary-500 border-t-4">
        <CardHeader>
          <div className="flex items-center justify-between w-full text-sm px-2">
            <p className="select-none font-semibold">{name}</p>
            <Chip color="default" variant="flat" size="sm">
              {length}
            </Chip>
          </div>
        </CardHeader>
      </Card>
      <div className="h-1/2 flex flex-col py-2 gap-2">
        <SortableContext items={applicantIds}>
          {applicants.map((applicant) => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
