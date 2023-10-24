import { Job } from "@/interfaces/job";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { User } from "@nextui-org/user";
import moment from "moment";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getJobDetails(id: string): Promise<Job & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/jobs/${id}/details`, {
    method: "GET",
    headers: headers(),
  });

  const res = await req.json();
  return res;
}

export default async function DetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const job = await getJobDetails(params.id);
  if (!job || job.error) {
    redirect("/dashboard/jobs");
  } else {
    return (
      <div className="flex gap-4">
        <div className="w-3/4 h-full">
          <Card>
            <CardHeader>
              <p className="font-semibold p-2">Job Description</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="text-sm px-4 pt-4 pb-8">
                <p>{job.description}</p>
                <h2 className="text-xl font-semibold mb-4 mt-8">
                  Responsibilities
                </h2>
                <p>{job.responsibilities}</p>
                <h2 className="text-xl font-semibold mb-4 mt-8">
                  Requirements
                </h2>
                <p>{job.requirements}</p>
                <h2 className="text-xl font-semibold mb-4 mt-8">Benefits</h2>
                <p>{job.benefits}</p>
                <p className="mt-10">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Libero eaque laborum quasi hic doloremque, blanditiis earum
                  quae consectetur quaerat numquam aspernatur eveniet
                  repudiandae expedita quis sunt voluptas nesciunt eius
                  cupiditate.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="w-1/4 h-full">
          <Card>
            <CardHeader>
              <p className="font-semibold p-2">Job Details</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="pb-2 px-2">
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground-400 mb-1">
                    Creation Date
                  </p>
                  <p className="text-sm">{moment(job.postedAt).format("LL")}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground-400 mb-1">
                    Expiration Date
                  </p>
                  <p className="text-sm">
                    {moment(job.applicationDeadline).format("LL")}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground-400 mb-1">
                    Contact Person
                  </p>
                  <div className="flex items-center gap-1">
                    <User
                      name="Jane Doe"
                      description="Hiring Manager"
                      avatarProps={{
                        src: "https://i.pravatar.cc/150",
                      }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground-400 mb-1">
                    Capacity
                  </p>
                  <p className="text-sm">{job.quota}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground-400 mb-1">
                    Job Type
                  </p>
                  <p className="text-sm">{job.jobType}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground-400 mb-1">
                    Location
                  </p>
                  <p className="text-sm">
                    {job.city}, {job.country}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground-400 mb-1">
                    Salary
                  </p>
                  <p className="text-sm">
                    {job.currency}
                    {job.salary}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground-400 mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm">TODO</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
