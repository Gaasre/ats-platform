"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import EditJobDetails from "@/components/job/edit-job-details";
import ApplicationForm from "@/components/application-form";
import HiringPipeline from "@/components/hiring-pipeline";
import { useRecoilState } from "recoil";
import { jobDetailsState } from "@/state/application-form-state";
import Stepper from "@/components/stepper";
import { useRouter } from "next/navigation";
import { AlertCircle, Ban } from "lucide-react";
import { Job } from "@/interfaces/job";

async function updateDetails(
  id: string,
  details: Job
): Promise<Job & { status?: string; message?: string }> {
  const req = await fetch(`/api/jobs/${id}/details`, {
    method: "PUT",
    body: JSON.stringify(details),
  });

  const res = await req.json();
  return res;
}

function StepComponent({ step, jobId }: { step: number; jobId: string }) {
  if (step == 0) {
    return <EditJobDetails />;
  } else if (step == 1) {
    return <ApplicationForm jobId={jobId} />;
  } else if (step == 2) {
    return <HiringPipeline jobId={jobId} />;
  }
}

export default function Steps({ id, job }: { id: string; job: Job }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setJobDetails(job);
  }, []);

  const saveExit = async () => {
    setIsLoading(true);
    const data = await updateDetails(id, jobDetails);
    if (data.status != "error") {
      push("/dashboard/jobs");
    } else {
      if (data.message) setError(data.message);
    }
    setIsLoading(false);
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const previousStep = () => setStep(step - 1);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium">Add New Job</h1>
        <div className="flex gap-4 items-center">
          <Button variant="light" onClick={saveExit} isLoading={isLoading}>
            Save & Close
          </Button>
          {step > 0 ? (
            <Button onClick={previousStep} variant="flat">
              Previous
            </Button>
          ) : (
            ""
          )}
          {step < 2 ? (
            <Button onClick={nextStep} variant="solid" color="primary">
              Next
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      <Card>
        <CardBody>
          {error ? (
            <div className="text-danger bg-danger-50 py-2 px-4 rounded-md text-sm flex items-center gap-2">
              <AlertCircle size={14} />
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
          <div className="flex">
            <div className="w-[250px]">
              <Stepper onStepChange={setStep} step={step}></Stepper>
            </div>
            <div className="flex-1">
              {jobDetails ? <StepComponent jobId={id} step={step} /> : ""}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
