"use client";

import Board from "@/components/board";
import { Badge } from "@nextui-org/badge";
import { Tab, Tabs } from "@nextui-org/tabs";
import JobTimeline from "./job-timeline";
import { Job } from "@/interfaces/job";
import JobDetails from "./job-details";
import { useRouter } from "next/navigation";

async function sendChangeStage(stageId: string, candidateId: string) {
  const req = await fetch(
    `http://localhost:3000/api/dashboard/candidate/${candidateId}/stage`,
    {
      method: "PATCH",
      body: JSON.stringify({
        stageId,
      }),
    }
  );

  const res = await req.json();
  return res;
}

export default function JobTabs({
  job,
  onUpdate,
}: {
  job: Job;
  onUpdate(): void;
}) {
  const changeStage = async (stageId: string, candidateId: string) => {
    const res = await sendChangeStage(stageId, candidateId);
    if (!res.error) {
      onUpdate();
    }
  };

  return (
    <Tabs aria-label="Job Tabs">
      <Tab
        key="candidates"
        title={
          <Badge content="5" color="danger">
            <span className="mr-3">Candidates</span>
          </Badge>
        }
      >
        <div>
          <Board
            stages={job.stages || []}
            onCandidateMove={changeStage}
          ></Board>
        </div>
      </Tab>
      <Tab key="details" title="Job Details">
        <JobDetails job={job}></JobDetails>
      </Tab>
      <Tab
        key="timeline"
        title={
          <Badge content="TODO" color="warning">
            <span className="mr-3">Timeline & Notes</span>
          </Badge>
        }
      >
        <JobTimeline></JobTimeline>
      </Tab>
    </Tabs>
  );
}
