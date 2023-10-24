import { Job } from "@/interfaces/job";
import { Tooltip } from "@nextui-org/tooltip";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Eye, Pencil } from "lucide-react";
import moment from "moment";
import { Link } from "@nextui-org/link";
import JobActiveSwitch from "./job-active-switch";
import JobDeleteButton from "./job-delete-button";

type Props = {
  jobs: Job[];
};

export default function JobTable({ jobs }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Table color="default" aria-label="active job list">
        <TableHeader>
          <TableColumn>Position</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>Work Type</TableColumn>
          <TableColumn>Published</TableColumn>
          <TableColumn>Candidates</TableColumn>
          <TableColumn align="end">Actions</TableColumn>
        </TableHeader>
        <TableBody items={jobs}>
          {(job) => (
            <TableRow key={job.id}>
              <TableCell>
                <div>
                  <div>{job.title}</div>
                  <div className="text-xs text-foreground-400">
                    {job.experienceLevel}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div>{job.city}</div>
                  <div className="text-xs text-foreground-400">
                    {job.country}
                  </div>
                </div>
              </TableCell>
              <TableCell>{job.jobType}</TableCell>
              <TableCell>{moment(job.postedAt).fromNow()}</TableCell>
              <TableCell>{job._count?.candidates}</TableCell>
              <TableCell className="w-[100px]">
                <div className="flex items-center">
                  <Tooltip content="Details">
                    <Link
                      isBlock
                      href={`/dashboard/jobs/${job.id}`}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <Eye size={14} />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Edit">
                    <Link
                      isBlock
                      href={`/dashboard/jobs/edit/${job.id}`}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <Pencil size={14} />
                    </Link>
                  </Tooltip>
                  <JobActiveSwitch id={job.id} active={!job.active} />
                  <JobDeleteButton id={job.id} />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
