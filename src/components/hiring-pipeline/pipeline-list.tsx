"use client";

import { useRecoilState } from "recoil";
import { stagesState } from "@/state/application-form-state";
import PipelineItem from "./pipeline-item";
import { Stage } from "@prisma/client";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { set } from "lodash";

type Props = {
  jobId: string;
  onDelete: (id: string) => void;
  onConfirm: (id: string, title: string, color: string) => void;
  onUp: (id: string) => void;
  onDown: (id: string) => void;
};

async function getStages(
  jobId: string
): Promise<(Stage & { isEditing: boolean })[]> {
  const res = await fetch(`/api/jobs/${jobId}/stage`, {
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

  return stages.map((item, index) => (
    <PipelineItem
      key={item.id}
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
      goDown={() => {
        if (index < stages.length - 1) {
          props.onDown(item.id);
          const newPipeline = [...stages];
          [newPipeline[index], newPipeline[index + 1]] = [
            newPipeline[index + 1],
            newPipeline[index],
          ];
          setStages(newPipeline);
        }
      }}
      goUp={() => {
        if (index > 0) {
          props.onUp(item.id);
          const newPipeline = [...stages];
          const temp = newPipeline[index];
          newPipeline[index] = newPipeline[index - 1];
          newPipeline[index - 1] = temp;
          setStages(newPipeline);
        }
      }}
    ></PipelineItem>
  ));
}
