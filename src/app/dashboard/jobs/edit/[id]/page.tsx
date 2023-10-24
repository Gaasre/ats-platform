import { redirect } from "next/navigation";
import Steps from "./steps";
import { headers } from "next/headers";
import { Job } from "@/interfaces/job";

async function getJobDetails(id: string): Promise<Job & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs/${id}/details`, {
    method: "GET",
    headers: headers(),
  });

  const res = await req.json();
  return res;
}

export default async function EditJobPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobDetails(params.id);
  if (!job || job.error) {
    redirect("/dashboard/jobs");
  } else {
    return <Steps job={job} id={params.id}></Steps>;
  }
}
