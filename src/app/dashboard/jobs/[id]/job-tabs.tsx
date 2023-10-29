"use client";

import Board from "@/components/board";
import { Badge } from "@nextui-org/badge";
import { Tab, Tabs } from "@nextui-org/tabs";
import JobTimeline from "./job-timeline";
import { Job } from "@/interfaces/job";
import JobDetails from "./job-details";

export default function JobTabs({ job }: { job: Job }) {
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
            onCandidateMove={(newStageId, candidateId) =>
              console.log(newStageId, candidateId)
            }
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
