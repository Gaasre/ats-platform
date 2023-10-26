import { Job } from "@/interfaces/job";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import moment from "moment";

import dynamic from "next/dynamic";
import { Link } from "@nextui-org/link";
import { ChevronLeft } from "lucide-react";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });

export default function JobDetails({ job }: { job: Job }) {
  return (
    <div>
      <div className="flex gap-4">
        <div className="w-3/4 h-full">
          <Card>
            <CardHeader>
              <p className="font-semibold p-2">Job Description</p>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="text-sm px-4 pt-4 pb-8">
                <Editor isEditor={false} initialContent={job.description} />
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
    </div>
  );
}
