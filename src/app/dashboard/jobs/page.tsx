"use client";

import { Tabs, Tab } from "@nextui-org/tabs";
import { Job } from "@/interfaces/job";
import JobTable from "@/components/job/job-table";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { jobsState } from "@/state/application-form-state";
import { Spinner } from "@nextui-org/spinner";
import moment from "moment";

async function getJobs(): Promise<Job[] & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

async function newJob() {
  const req = await fetch("/api/jobs", {
    method: "POST",
    body: JSON.stringify({}),
  });

  const res = await req.json();
  return res;
}

const isExpired = (job: Job) =>
  moment(job.applicationDeadline).isBefore(moment());

export default function JobsPage() {
  const [jobs, setJobs] = useRecoilState(jobsState);
  const [loading, setLoading] = useState(true);
  const [loadingNew, setLoadingNew] = useState(false);
  const router = useRouter();

  const createJob = async () => {
    setLoadingNew(true);
    const job = await newJob();
    await router.push(`/dashboard/jobs/edit/${job.id}`);
    setLoadingNew(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getJobs();
      console.log(data);
      setJobs(data);
      setLoading(false);
    };

    fetchData().catch(console.error);
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {loading ? <Spinner size="sm" /> : jobs.length} Job Posts
        </h1>
        <Button
          isLoading={loadingNew}
          variant="solid"
          color="primary"
          onClick={createJob}
        >
          New Job
        </Button>
      </div>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options">
          <Tab key="active" title="Active">
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <JobTable
                jobs={jobs.filter((job) => job.active && !isExpired(job))}
              />
            )}
          </Tab>
          <Tab key="inactive" title="Inactive">
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <JobTable
                jobs={jobs.filter((job) => !job.active && !isExpired(job))}
              />
            )}
          </Tab>
          <Tab key="expired" title="Expired">
            {loading ? (
              <Spinner size="sm" />
            ) : (
              <JobTable jobs={jobs.filter((job) => isExpired(job))} />
            )}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
