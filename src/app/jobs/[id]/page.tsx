import { Job } from "@/interfaces/job";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";

import dynamic from "next/dynamic";
import JobForm from "./job-form";
import { CustomFieldType } from "@/interfaces/form";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

async function getJobDetails(id: string): Promise<Job & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs/${id}/details`, {
    method: "GET",
    headers: headers(),
  });

  const res = await req.json();
  return res;
}

async function getJobForm(id: string): Promise<CustomFieldType[]> {
  const req = await fetch(`http://localhost:3000/api/jobs/${id}/form`, {
    method: "GET",
    headers: headers(),
  });

  const res = await req.json();
  return res;
}

const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 3,
});

const EUR = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
  maximumSignificantDigits: 3,
});

export default async function JobPost({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const job = await getJobDetails(params.id);
  const form = await getJobForm(params.id);
  if (!job || job.error) {
    redirect("/");
  } else {
    return (
      <div>
        <div className="h-80 relative w-full bg-default-800 text-default-100">
          <div className="max-w-screen-xl mx-auto flex items-center justify-center h-full flex-col">
            <h1 className="text-2xl">{job.company?.name}</h1>
            <h2 className="text-5xl font-bold mb-6">{job.title}</h2>
            <h3 className="text-lg mb-6">
              {job.city}, {job.country}
            </h3>
            <div className="flex gap-2">
              <Chip color="warning" variant="flat">
                {job.jobType}
              </Chip>
              <Chip color="warning" variant="flat">
                {job.employmentType}
              </Chip>
              <Chip color="warning" variant="flat">
                {job.experienceLevel}
              </Chip>
              <Chip color="warning" variant="flat">
                ∼
                {job.currency == "USD"
                  ? USD.format(job.salary)
                  : EUR.format(job.salary)}
              </Chip>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-3">
            <div className="col-span-2 w-full py-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold">Job description</h2>
              <Divider className="mt-4 mb-8" />
              <Editor isEditor={false} initialContent={job.description} />
              <JobForm job={job} form={form}></JobForm>
            </div>
            <div className="p-8">I will put something here</div>
          </div>
        </div>
      </div>
    );
  }
}
