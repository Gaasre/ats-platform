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
import ApplicantCard from "./applicant-card";
import { useState } from "react";
import StepColumn from "./step-column";
import { Applicant } from "@/interfaces/applicant";
import { arrayMove } from "@dnd-kit/sortable";

export default function Board() {
  const [droppedId, setDroppedId] = useState<number | null>(null);
  const [activeApplicant, setActiveApplicant] = useState<Applicant | null>();
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor);

  const [items, setItems] = useState([
    {
      id: 10,
      name: "Applied",
      length: 20,
    },
    { id: 20, name: "Screening", length: 10 },
    { id: 30, name: "Technical Challenge", length: 2 },
  ]);

  const [applicants, setApplicants] = useState([
    {
      id: 1,
      firstname: "Julian",
      lastname: "Hulbert",
      columnId: 10,
    },
    {
      id: 2,
      firstname: "Mike",
      lastname: "Jaders",
      columnId: 10,
    },
    {
      id: 3,
      firstname: "Kevin",
      lastname: "Dukkon",
      columnId: 10,
    },
  ]);

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Applicant") {
      setActiveApplicant(event.active.data.current.applicant);
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    if (active.id === over.id) return;

    const isActiveAnApplicant = active.data.current?.type === "Applicant";
    const isOverAnApplicant = over.data.current?.type === "Applicant";

    // Dropping an Applicant over another Applicant
    if (isActiveAnApplicant && isOverAnApplicant) {
      setApplicants((applicants) => {
        const activeIndex = applicants.findIndex((a) => a.id == active.id);
        const overIndex = applicants.findIndex((a) => a.id === over.id);

        applicants[activeIndex].columnId = applicants[overIndex].columnId;

        return arrayMove(applicants, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    // Dropping an Applicant over a Column
    if (isActiveAnApplicant && isOverAColumn) {
      setApplicants((applicants) => {
        const activeIndex = applicants.findIndex((a) => a.id == active.id);

        applicants[activeIndex].columnId = parseInt(over.id.toString());

        return arrayMove(applicants, activeIndex, activeIndex);
      });
    }
  }

  return (
    <div className="flex gap-6 h-full">
      <DndContext sensors={sensors} onDragOver={onDragOver} onDragStart={onDragStart}>
        {items.map((step) => (
          <StepColumn
            id={step.id}
            key={step.id}
            length={20}
            name={step.name}
            applicants={applicants.filter((a) => a.columnId == step.id)}
          />
        ))}

        <DragOverlay>
          {activeApplicant ? (
            <ApplicantCard
              customClass="border-2 border-primary-400"
              applicant={activeApplicant}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
