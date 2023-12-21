import { Source } from "@prisma/client";
import { DeltaType } from "@tremor/react";

export type DailyCandidateStats = {
  count: number;
  deltaType: DeltaType;
  delta: string;
};

export type SourceGraph = ({
  date: string;
} & Record<Source, number>)[];
