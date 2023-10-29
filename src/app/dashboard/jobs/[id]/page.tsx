import { headers } from "next/headers";
import { Job } from "@/interfaces/job";
import { ChevronLeft } from "lucide-react";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import JobTabs from "./job-tabs";

async function getJobDetails(id: string): Promise<Job & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/jobs/${id}`, {
    method: "GET",
    headers: headers(),
  });

  const res = await req.json();
  return res;
}

export default async function JobPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const job = await getJobDetails(params.id);
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
      <JobTabs job={job}></JobTabs>
    </div>
  );
}
