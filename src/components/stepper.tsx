import { Button } from "@nextui-org/button";
import { Check } from "lucide-react";
import React from "react";

type Props = {
  step: number;
  onStepChange: (step: number) => void;
};

const steps = ["Job Details", "Application Form", "Hiring Pipeline", "Candidate Filters"];

export default function Stepper(props: Props) {
  const currentVariant = (idx: number) => (props.step < idx ? "light" : "flat");
  const hasPast = (idx: number) => props.step > idx;
  return (
    <div className="p-4 flex flex-col gap-2">
      {steps.map((step, index) => (
        <Button
          variant={currentVariant(index)}
          color={hasPast(index) ? "primary" : "default"}
          key={index}
          className="w-full justify-start"
          onClick={() => props.onStepChange(index)}
        >
          <div className="flex gap-2 items-center">
            <div
              className={`w-6 h-6 ${
                hasPast(index)
                  ? "bg-primary text-white"
                  : "bg-foreground-100 text-foreground-400"
              } text-sm flex items-center justify-center rounded-full`}
            >
              {hasPast(index) ? (
                <Check size={14} strokeWidth={3} />
              ) : (
                <div>{index + 1}</div>
              )}
            </div>
            <div
              className={
                index > props.step
                  ? "text-foreground-200"
                  : index < props.step
                  ? "text-primary-400"
                  : "text-foreground-500"
              }
            >
              {step}
            </div>
          </div>
        </Button>
      ))}
    </div>
  );
}
