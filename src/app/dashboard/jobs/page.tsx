"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Job } from "@/interfaces/job";
import JobTable from "@/components/job-table";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const jobs: Job[] = [
  {
    id: 1,
    position: "Product Designer",
    createdAt: new Date(),
    candidates: 10,
    city: "Berlin",
    country: "Germany",
    status: "Active",
    type: "Hybrid",
    seniority: "Senior",
  },
  {
    id: 2,
    position: "UI/UX Designer",
    createdAt: new Date(),
    candidates: 2,
    city: "Berlin",
    country: "Germany",
    status: "Inactive",
    type: "Remote",
    seniority: "Mid-Level",
  },
  {
    id: 3,
    position: "Frontend Engineer",
    createdAt: new Date(),
    candidates: 2,
    city: "Berlin",
    country: "Germany",
    status: "Active",
    type: "Remote",
    seniority: "Mid-Level",
  },
  {
    id: 4,
    position: "Backend Engineer",
    createdAt: new Date(),
    candidates: 2,
    city: "Berlin",
    country: "Germany",
    status: "Inactive",
    type: "Remote",
    seniority: "Mid-Level",
  },
];

async function newJob() {
  const req = await fetch("/api/jobs", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const res = await req.json();
  return res;
}

export default function JobsPage() {
  const router = useRouter();
  const createJob = async () => {
    const job = await newJob();
    router.push(`/dashboard/jobs/edit/${job.id}`);
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">13 Job Posts</h1>
        <Button variant="solid" color="primary" onClick={createJob}>
          New Job
        </Button>
      </div>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="active" title="Active">
            <JobTable jobs={jobs.filter((job) => job.status == "Active")} />
          </Tab>
          <Tab key="inactive" title="Inactive">
            <JobTable jobs={jobs.filter((job) => job.status == "Inactive")} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
