"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import CandidateCard from "./candidate-card";
import { useState } from "react";
import StepColumn from "./step-column";
import { ICandidate } from "@/interfaces/candidate";
import { arrayMove } from "@dnd-kit/sortable";
import { Stage } from "@/interfaces/stage";
import { Candidate } from "@prisma/client";

type Props = {
  stages: Stage[];
  candidates: ICandidate[];
  onCandidateMove(newStageId: string, candidate: ICandidate): void;
};

export default function Board({ candidates, stages, onCandidateMove }: Props) {
  const [droppedId, setDroppedId] = useState<number | null>(null);
  const [activeCandidate, setActiveCandidate] = useState<ICandidate | null>();
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Candidate") {
      setActiveCandidate(event.active.data.current.candidate);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const isActiveACandidate = active.data.current?.type === "Candidate";
    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveACandidate && activeCandidate) {
      if (isOverAColumn) {
        if (over.id == active.data.current?.stageId) return;
        console.log(over.id);
        onCandidateMove(over.id as string, activeCandidate);
      } else {
        if (active.data.current?.stageId == over.data.current?.stageId) return;
        console.log(over.data.current?.stageId);
        onCandidateMove(over.data.current?.stageId as string, activeCandidate);
      }
    }
  }

  return (
    <div className="flex gap-6 h-full mt-4">
      <DndContext
        sensors={sensors}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        {stages.map((stage) => (
          <StepColumn
            candidates={candidates.filter((c) => c.stageId == stage.id)}
            stage={stage}
            key={stage.id}
          />
        ))}

        <DragOverlay>
          {activeCandidate ? (
            <CandidateCard
              stageId=""
              customClass="border-2 border-primary-400"
              candidate={activeCandidate}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
