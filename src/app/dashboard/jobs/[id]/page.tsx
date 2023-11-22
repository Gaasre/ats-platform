"use client";

import { Job } from "@/interfaces/job";
import { ChevronLeft } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import JobTabs from "./job-tabs";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/spinner";
import { Candidate } from "@prisma/client";
import { ICandidate } from "@/interfaces/candidate";

async function getJobDetails(id: string): Promise<Job & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/jobs/${id}`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

export default function JobPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const [job, setJob] = useState<Job>();

  const fetchData = async () => {
    const data = await getJobDetails(params.id);
    setJob(data);
  };

  const onUpdateCandidate = async (
    newStageId: string,
    candidate: ICandidate
  ) => {
    if (job) {
      setJob({
        ...job,
        candidates: job?.candidates?.map((c) => {
          if (c.id == candidate.id) {
            return { ...c, stageId: newStageId };
          }
          return c;
        }),
      });
    }
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  if (job) {
    return (
      <div>
        <div className="flex items-center gap-4 mb-8">
          <Button
            href="/dashboard/jobs"
            as={Link}
            isIconOnly
            color="primary"
            variant="flat"
            aria-label="Back"
          >
            <ChevronLeft />
          </Button>
          <div>
            <p className="text-foreground-500 text-sm font-semibold uppercase">
              {job.experienceLevel}
            </p>
            <h1 className="text-2xl font-bold">{job.title}</h1>
            <div className="flex gap-2 items-center text-xs text-foreground-400">
              <p>
                {job.city}, {job.country}
              </p>
              <p className="font-bold text-lg leading-none mb-1.5">.</p>
              <p>{job.jobType}</p>
            </div>
          </div>
        </div>
        <JobTabs onUpdateCandidate={onUpdateCandidate} job={job}></JobTabs>
      </div>
    );
  }
}
