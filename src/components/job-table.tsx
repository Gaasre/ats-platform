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
import { Eye, Trash, Trash2 } from "lucide-react";
import moment from "moment";
import { Link } from "@nextui-org/link";

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
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody items={jobs}>
          {(job) => (
            <TableRow key={job.id}>
              <TableCell>
                <div>
                  <div>{job.position}</div>
                  <div className="text-xs text-foreground-400">
                    {job.seniority}
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
              <TableCell>{job.type}</TableCell>
              <TableCell>{moment(job.createdAt).fromNow()}</TableCell>
              <TableCell>{job.candidates}</TableCell>
              <TableCell>
                <Tooltip content="Details">
                  <Link
                    href={`/dashboard/jobs/${job.id}`}
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  >
                    <Eye />
                  </Link>
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
