"use client";

import { redirect } from "next/navigation";
import Steps from "./steps";
import { Job } from "@/interfaces/job";
import { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";

async function getJobDetails(id: string): Promise<Job & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/dashboard/jobs/${id}`, {
    method: "GET",
  });

  const res = req.json();
  return res;
}

export default function EditJobPage({ params }: { params: { id: string } }) {
  const [job, setJob] = useState<Job>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getJobDetails(params.id).then((data) => {
      if (!data.error) {
        setJob(data);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    <CircularProgress aria-label="Loading..." />;
  } else {
    if (job) {
      return <Steps job={job} id={params.id}></Steps>;
    }
  }
}
