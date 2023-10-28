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

async function submitForm(form: FieldValues, jobId: string) {
  const formData = new FormData();
  const fileKeys = [];

  for (var key in form) {
    if (form[key] instanceof File) {
      fileKeys.push(key);
    }
    formData.append(key, form[key]);
  }
  formData.append("fileKeys", JSON.stringify(fileKeys));

  const req = await fetch(`http://localhost:3000/api/jobs/${jobId}/candidate`, {
    method: "POST",
    body: formData,
  });

  const res = await req.json();
  return res;
}

export default function JobForm({
  job,
  form,
}: {
  job: Job;
  form: CustomFieldType[];
}) {
  const methods = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = methods;
  const [loading, setLoading] = useState(false);

  return (
    <div className="my-12 p-8 border rounded">
      <h2 className="text-3xl font-bold mb-12">Application form</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(async (data) => {
            setLoading(true);
            const res = await submitForm(data, job.id);
            setLoading(false);
          })}
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <Input
              {...register("firstName", { required: "First name is required" })}
              type="text"
              label="First Name"
              labelPlacement="outside"
              placeholder="First Name"
              color={errors.firstName?.message ? "danger" : "default"}
              errorMessage={errors.firstName?.message as string}
            />
            <Input
              {...register("lastName", { required: "Last name is required" })}
              type="text"
              label="Last Name"
              labelPlacement="outside"
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
              labelPlacement="outside"
              placeholder="Email"
              color={errors.email?.message ? "danger" : "default"}
              errorMessage={errors.email?.message as string}
            />
            <Input
              {...register("phone", { required: "Phone Number is required" })}
              type="tel"
              label="Phone Number"
              labelPlacement="outside"
              placeholder="Phone Number"
              color={errors.phone?.message ? "danger" : "default"}
              errorMessage={errors.phone?.message as string}
            />
            <Controller
              name="resume"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <label htmlFor="resume">
                  <span className="block text-small font-medium text-foreground pb-1.5">
                    Résume
                  </span>
                  <input
                    {...field}
                    onChange={(event) =>
                      onChange(
                        event.target.files ? event.target.files[0] : null
                      )
                    }
                    type="file"
                    id="resume"
                    className="hidden"
                  />
                  <div className="w-full cursor-pointer text-small gap-2 text-foreground-500 flex items-center bg-default-100 hover:bg-default-200 px-3 shadow-sm min-h-unit-10 rounded-medium transition-background duration-150">
                    <Upload size={14} /> Attach File
                  </div>
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
    </div>
  );
}
