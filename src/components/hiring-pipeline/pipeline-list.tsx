"use client";

import { useRecoilState } from "recoil";
import { stagesState } from "@/state/application-form-state";
import PipelineItem from "./pipeline-item";
import { Stage } from "@prisma/client";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

type Props = {
  jobId: string;
  onDelete: (id: string) => void;
  onConfirm: (id: string, title: string, color: string) => void;
  onChangeOrder: (
    item1: { id: string; order: number },
    item2: { id: string; order: number }
  ) => void;
};

async function getStages(
  jobId: string
): Promise<(Stage & { isEditing: boolean })[]> {
  const res = await fetch(`/api/dashboard/jobs/${jobId}/stage`, {
    method: "GET",
  });

  const returnData = res.json().then((data) =>
    data.map((stage: Stage) => ({
      ...stage,
      isEditing: false,
    }))
  );

  return returnData;
}

export default function PipelineList(props: Props) {
  const [stages, setStages] = useRecoilState(stagesState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setStages(() => {
        let items = [...stages];
        const oldIndex = items.findIndex((a) => a.id == active.id);
        const newIndex = items.findIndex((a) => a.id == over.id);

        const oldOrder = items[oldIndex].order;
        const newOrder = items[newIndex].order;

        console.log(oldOrder, newOrder);

        items = items.map((item) => {
          if (item.id == active.id) {
            item = { ...item, order: newOrder };
          }
          if (item.id == over.id) {
            item = { ...item, order: oldOrder };
          }
          return item;
        });

        props.onChangeOrder(
          { id: items[oldIndex].id, order: newOrder },
          { id: items[newIndex].id, order: oldOrder }
        );

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getStages(props.jobId).then((data) => {
      setStages(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Spinner label="Loading" color="primary" labelColor="primary" />;
  }

  return (
    <>
      <PipelineItem
        order={0}
        key={stages[0].id}
        id={stages[0].id}
        jobId={props.jobId}
        stageId={stages[0].id}
        color={stages[0].color}
        title={stages[0].title}
        isEditing={stages[0].isEditing}
        onConfirm={(title, color) => {
          props.onConfirm(stages[0].id, title, color);
          const newPipeline = [...stages];
          newPipeline[0] = {
            ...newPipeline[0],
            title,
            color,
            isEditing: false,
          };
          setStages(newPipeline);
        }}
        onDelete={() => {
          props.onDelete(stages[0].id);
          const newPipeline = [...stages];
          setStages(newPipeline.filter(({ id }) => id !== stages[0].id));
        }}
        setIsEditing={(isEditing) => {
          const newPipeline = [...stages];
          newPipeline[0] = { ...newPipeline[0], isEditing };
          setStages(newPipeline);
        }}
      ></PipelineItem>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext
          items={stages.slice(1)}
          strategy={verticalListSortingStrategy}
        >
          {stages.slice(1).map((item, index) => (
            <PipelineItem
              order={item.order}
              key={item.id}
              id={item.id}
              jobId={props.jobId}
              stageId={item.id}
              color={item.color}
              title={item.title}
              isEditing={item.isEditing}
              onConfirm={(title, color) => {
                props.onConfirm(item.id, title, color);
                const newPipeline = [...stages];
                newPipeline[index] = {
                  ...newPipeline[index],
                  title,
                  color,
                  isEditing: false,
                };
                setStages(newPipeline);
              }}
              onDelete={() => {
                props.onDelete(item.id);
                const newPipeline = [...stages];
                setStages(newPipeline.filter(({ id }) => id !== item.id));
              }}
              setIsEditing={(isEditing) => {
                const newPipeline = [...stages];
                newPipeline[index] = { ...newPipeline[index], isEditing };
                setStages(newPipeline);
              }}
            ></PipelineItem>
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}
