"use client";

import { Job } from "@/interfaces/job";
import { jobsState } from "@/state/application-form-state";
import { Link, Spinner } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/tooltip";
import { Pause, Play } from "lucide-react";
import { useState } from "react";
import { useRecoilState } from "recoil";

type Props = {
  id: string;
  active: boolean;
  isDisabled: boolean;
};

async function changeStatus(
  id: string,
  active: boolean
): Promise<{ status: string; message: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs/${id}/active`, {
    method: "PATCH",
    body: JSON.stringify({
      active,
    }),
  });

  const res = await req.json();
  return res;
}

async function getJobs(): Promise<Job[] & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

export default function JobActiveSwitch({ id, active, isDisabled }: Props) {
  const [jobs, setJobs] = useRecoilState(jobsState);
  const [loading, setLoading] = useState(false);
  const toogleActive = async () => {
    setLoading(true);
    const data = await changeStatus(id, active);
    if (data.status == "success") {
      const jobsData = await getJobs();
      setJobs(jobsData);
    }
    setLoading(false);
  };
  return (
    <Tooltip content={active ? "Set Active" : "Set Inactive"}>
      {loading ? (
        <Spinner size="sm" />
      ) : (
        <Link
          isDisabled={isDisabled}
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={toogleActive}
          color="primary"
          isBlock
        >
          {active ? <Play size={14} /> : <Pause size={14} />}
        </Link>
      )}
    </Tooltip>
  );
}
