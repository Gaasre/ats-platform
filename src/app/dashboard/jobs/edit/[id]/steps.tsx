"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import React, { useEffect, useState } from "react";
import EditJobDetails from "@/components/edit-job-details";
import ApplicationForm from "@/components/application-form";
import HiringPipeline from "@/components/hiring-pipeline";
import { useRecoilState } from "recoil";
import { jobDetailsState } from "@/state/application-form-state";
import { Job } from "@prisma/client";
import Stepper from "@/components/stepper";
import { useRouter } from "next/navigation";

async function updateDetails(id: string, details: Job) {
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
  const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState);
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setJobDetails(job);
  }, []);

  const saveExit = async () => {
    setIsLoading(true);
    await updateDetails(id, jobDetails);
    //TODO: update the application form
    setIsLoading(false);
    push("/dashboard/jobs");
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
