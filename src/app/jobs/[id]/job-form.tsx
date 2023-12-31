"use client";

import { CustomFieldType } from "@/interfaces/form";
import { Job } from "@/interfaces/job";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Upload } from "lucide-react";
import CustomForm from "./custom-form";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { motion } from "framer-motion";
import { Source } from "@prisma/client";

async function submitForm(form: FieldValues, jobId: string, source: Source) {
  const formData = new FormData();
  formData.append("source", source);

  const fileKeys = [];

  for (var key in form) {
    if (form[key] instanceof File) {
      fileKeys.push(key);
      const file = form[key] as File;
      const filename = file.name.split(".");
      formData.append(key, filename[filename.length - 1]);
    } else {
      formData.append(key, form[key]);
    }
  }
  formData.append("fileKeys", JSON.stringify(fileKeys));

  const req = await fetch(`http://localhost:3000/api/jobs/${jobId}/candidate`, {
    method: "POST",
    body: formData,
  });

  const res = await req.json();

  if (res.urls) {
    const links: { key: string; url: string }[] = res.urls;
    await Promise.all(
      links.map(async ({ key, url }) => {
        const file: File = form[key];
        await fetch(url, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
      })
    );
  }

  return res;
}

export default function JobForm({
  job,
  form,
  source,
}: {
  job: Job;
  form: CustomFieldType[];
  source: Source;
}) {
  const methods = useForm();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;
  const [loading, setLoading] = useState(false);

  return (
    <div className="my-12 p-8 border rounded">
      {success ? (
        <div className="flex items-center justify-center flex-col gap-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check-circle"
          >
            <motion.path
              className="text-primary-100"
              initial={{ pathLength: 0, scale: 0 }}
              animate={{ pathLength: 1, scale: 1 }}
              transition={{
                duration: 1,
              }}
              d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
            />
            <motion.polyline
              className="text-primary"
              transition={{
                duration: 0.5,
              }}
              initial={{ pathLength: 0, scale: 0 }}
              animate={{ pathLength: 1, scale: 1 }}
              points="22 4 12 14.01 9 11.01"
            />
          </svg>
          <div className="text-center max-w-sm space-y-4">
            <motion.h2
              transition={{
                duration: 0.5,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-3xl font-semibold"
            >
              Thank you for your job application!
            </motion.h2>
            <motion.p
              transition={{
                duration: 0.5,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              Your application has been received. We will review it and be in
              touch if your qualifications match our requirements.
            </motion.p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-12">Application form</h2>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(async (data) => {
                setLoading(true);
                const res = await submitForm(data, job.id, source);
                setLoading(false);
                if (!res.error) {
                  setSuccess(true);
                }
              })}
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <Input
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  type="text"
                  label="First Name"
                  labelPlacement="outside"
                  isRequired
                  placeholder="First Name"
                  color={errors.firstName?.message ? "danger" : "default"}
                  errorMessage={errors.firstName?.message as string}
                />
                <Input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  type="text"
                  label="Last Name"
                  labelPlacement="outside"
                  isRequired
                  placeholder="Last Name"
                  color={errors.lastName?.message ? "danger" : "default"}
                  errorMessage={errors.lastName?.message as string}
                />
                <Input
                  {...register("email", {
                    required: "Email is required",
                    validate: {
                      matchPattern: (v) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                        "Email address must be a valid address",
                    },
                  })}
                  type="email"
                  label="Email"
                  isRequired
                  labelPlacement="outside"
                  placeholder="Email"
                  color={errors.email?.message ? "danger" : "default"}
                  errorMessage={errors.email?.message as string}
                />
                <Input
                  {...register("phone", {
                    required: "Phone Number is required",
                  })}
                  type="tel"
                  isRequired
                  label="Phone Number"
                  labelPlacement="outside"
                  placeholder="Phone Number"
                  color={errors.phone?.message ? "danger" : "default"}
                  errorMessage={errors.phone?.message as string}
                />
                <Controller
                  name="resume"
                  rules={{
                    required: "Resume is required",
                    validate: (value) => {
                      if (value.type != "application/pdf") {
                        return "Invalid file format. Only PDF files are allowed.";
                      }
                      if (value.size > 5 * 10 ** 6) {
                        return "Invalid file size. The file shouldn't exceed 5MBs";
                      }
                      return true;
                    },
                  }}
                  control={control}
                  render={({
                    field: { value, onChange, ...field },
                    fieldState: { error },
                  }) => (
                    <label htmlFor="resume">
                      <span
                        className={`block text-small font-medium pb-1.5 after:ml-0.5 after:content-['*'] after:text-danger 
                      ${error?.message ? "text-danger" : "text-foreground"}`}
                      >
                        Resume
                      </span>
                      <input
                        {...field}
                        onChange={(event) =>
                          onChange(
                            event.target.files ? event.target.files[0] : null
                          )
                        }
                        accept="application/pdf"
                        type="file"
                        id="resume"
                        className="hidden"
                      />
                      <div
                        className={`w-full cursor-pointer text-small gap-2 flex items-center ${
                          error?.message
                            ? "text-danger bg-danger-50 hover:bg-danger-100"
                            : "text-foreground-500 bg-default-100 hover:bg-default-200"
                        } px-3 shadow-sm min-h-unit-10 rounded-medium transition-background duration-150`}
                      >
                        <Upload size={14} />{" "}
                        {value ? value.name : "Attach file"}
                      </div>
                      {error?.message ? (
                        <div className="text-tiny text-danger mt-1">
                          {error?.message}
                        </div>
                      ) : (
                        <div className="text-tiny text-foreground-400 mt-1">
                          Please upload in PDF format
                        </div>
                      )}
                    </label>
                  )}
                ></Controller>
              </div>
              <CustomForm form={form}></CustomForm>
              <div className="text-center">
                <Button
                  isLoading={loading}
                  type="submit"
                  color="primary"
                  className="w-[200px]"
                >
                  Submit
                </Button>
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
}
