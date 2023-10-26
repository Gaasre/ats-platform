import { Job } from "@/interfaces/job";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

async function getJobDetails(id: string): Promise<Job & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs/${id}/details`, {
    method: "GET",
    headers: headers(),
  });

  const res = await req.json();
  return res;
}

export default async function JobPost({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const job = await getJobDetails(params.id);
  if (!job || job.error) {
    redirect("/dashboard/jobs");
  } else {
    return (
      <div className="grid grid-cols-3">
        <div className="col-span-2 w-full">
          <Editor isEditor={false} initialContent={job.description} />
        </div>
        <div></div>
      </div>
    );
  }
}
