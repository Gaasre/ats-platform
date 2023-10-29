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
import { Candidate } from "@/interfaces/candidate";
import { arrayMove } from "@dnd-kit/sortable";
import { Stage } from "@/interfaces/stage";

type Props = {
  stages: Stage[];
  onCandidateMove(newStageId: string, candidateId: string): void;
};

export default function Board({ stages, onCandidateMove }: Props) {
  const [droppedId, setDroppedId] = useState<number | null>(null);
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>();
  const [activeStage, setActiveStage] = useState("");
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

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const isActiveACandidate = active.data.current?.type === "Candidate";
    // const isOverACandidate = over.data.current?.type === "Candidate";

    // // Dropping an Candidate over another Candidate
    // if (isActiveACandidate && isOverACandidate) {
    //   setCandidates((candidates) => {
    //     const activeIndex = candidates.findIndex((a) => a.id == active.id);
    //     const overIndex = candidates.findIndex((a) => a.id === over.id);

    //     candidates[activeIndex].columnId = candidates[overIndex].columnId;

    //     return arrayMove(candidates, activeIndex, overIndex);
    //   });
    // }

    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping an Candidate over a Column
    if (isActiveACandidate && isOverAColumn) {
      console.log(activeCandidate?.stageId, over.id);
      if (activeCandidate?.stageId != over.id) {
        setActiveStage(over.id as string);
      }
      onCandidateMove(active.id as string, over.id as string);
      // setCandidates((candidates) => {
      //   const activeIndex = candidates.findIndex((a) => a.id == active.id);
      //   candidates[activeIndex].columnId = parseInt(over.id.toString());
      //   return arrayMove(candidates, activeIndex, activeIndex);
      // });
    }
  }

  return (
    <div className="flex gap-6 h-full">
      <DndContext
        sensors={sensors}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
      >
        {stages.map((stage) => (
          <StepColumn
            stage={stage}
            key={stage.id}
            active={activeStage == stage.id}
          />
        ))}

        <DragOverlay>
          {activeCandidate ? (
            <CandidateCard
              customClass="border-2 border-primary-400"
              candidate={activeCandidate}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
