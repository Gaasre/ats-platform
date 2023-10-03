import { authOptions } from "@/lib/auth";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import {
  Briefcase,
  Calendar,
  KanbanSquare,
  LayoutDashboard,
  MessagesSquare,
} from "lucide-react";
import { getServerSession } from "next-auth";

export default async function LeftMenu() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col w-[250px] px-6 gap-1 py-6 justify-between h-full">
      <div className="flex flex-col">
        <p className="select-none uppercase pl-2 font-semibold text-sm mb-2">
          Menu
        </p>
        <Link isBlock href="#" color="foreground" size="sm">
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full bg-foreground-100">
              <LayoutDashboard size={14} strokeWidth={2} />
            </span>
            Dashboard
          </div>
        </Link>
        <Link isBlock href="#" color="foreground" size="sm">
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full bg-foreground-100">
              <Calendar size={14} strokeWidth={2} />
            </span>
            Calendar
          </div>
        </Link>
        <p className="select-none uppercase pl-2 font-semibold text-sm mb-2 mt-6">
          Recruitment
        </p>
        <Link isBlock href="/dashboard/jobs" color="foreground" size="sm">
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full bg-foreground-100">
              <Briefcase size={14} />
            </span>
            Jobs
          </div>
        </Link>
        <Link isBlock href="/dashboard/candidates" color="foreground" size="sm">
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full bg-foreground-100">
              <KanbanSquare size={14} />
            </span>
            Candidates
          </div>
        </Link>
        <Link
          isBlock
          href="/dashboard/assessments"
          color="foreground"
          size="sm"
        >
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full bg-foreground-100">
              <MessagesSquare size={14} strokeWidth={2} />
            </span>
            Assessments
          </div>
        </Link>
        <p className="select-none uppercase pl-2 font-semibold text-sm mb-2 mt-6">
          Organization
        </p>
        <Link isBlock href="#" color="foreground" size="sm">
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full bg-foreground-100">
              <LayoutDashboard size={14} strokeWidth={2} />
            </span>
            Team
          </div>
        </Link>
      </div>
      <div>
        <User
          className="mb-4"
          name={session?.user.name || "Unknown"}
          description={session?.user.Company?.name || "No Company"}
          avatarProps={{
            src: "https://i.pravatar.cc/150?img=68",
          }}
        />
        {!session?.user.Company && (
          <Button
            as={Link}
            href="/dashboard/company/new"
            variant="shadow"
            fullWidth
            color="primary"
          >
            Create Company
          </Button>
        )}
      </div>
    </div>
  );
}
