"use client";

import { Link } from "@nextui-org/link";
import {
  Briefcase,
  Calendar,
  KanbanSquare,
  LayoutDashboard,
  LogOut,
  Mails,
  MessagesSquare,
  Settings,
  Users2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { signOut } from "next-auth/react";

export default function LeftMenu({ children }: { children: JSX.Element }) {
  const pathname = usePathname();

  const pathClass = (path: string) => {
    const splitPath = pathname.split("/");
    if (splitPath.length <= 2) {
      if (path == "dashboard") {
        return {
          menu: "text-primary bg-primary-50 shadow shadow-primary-200",
          attachment: "w-2",
        };
      } else {
        return {
          menu: "text-neutral-500 bg-white shadow shadow-transparent",
          attachment: "w-0",
        };
      }
    } else {
      if (splitPath[2].startsWith(path)) {
        return {
          menu: "text-primary bg-primary-50 shadow shadow-primary-200",
          attachment: "w-2",
        };
      } else {
        return {
          menu: "text-neutral-500 bg-white shadow shadow-transparent",
          attachment: "w-0",
        };
      }
    }
  };

  return (
    <div className="flex flex-col w-[250px] px-6 gap-1 py-6 justify-between h-full">
      <div className="flex flex-col gap-y-2">
        <p className="select-none uppercase pl-2 font-medium text-xs text-neutral-400">
          Menu
        </p>
        <Link
          className={`hover:bg-primary-50 hover:text-primary hover:after:opacity-0 rounded-lg duration-200 font-medium py-2 relative ${
            pathClass("dashboard").menu
          }`}
          isBlock
          href="#"
          color="foreground"
          size="sm"
        >
          <div
            className={`${
              pathClass("dashboard").attachment
            } rounded-l h-full bg-primary absolute -right-6 top-0 duration-200 transition-all`}
          ></div>
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full">
              <LayoutDashboard size={14} strokeWidth={2} />
            </span>
            Dashboard
          </div>
        </Link>
        <Link
          className={`hover:bg-primary-50 hover:after:opacity-0 hover:text-primary duration-200 rounded-lg font-medium py-2 relative ${
            pathClass("calendar").menu
          }`}
          isBlock
          href="#"
          size="sm"
        >
          <div
            className={`${
              pathClass("calendar").attachment
            } rounded-l h-full bg-primary absolute -right-6 top-0 duration-200 transition-all`}
          ></div>
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full">
              <Calendar size={14} strokeWidth={2} />
            </span>
            Calendar
          </div>
        </Link>
        <p className="select-none uppercase pl-2 font-medium text-xs text-neutral-400 mt-6">
          Recruitment
        </p>
        <Link
          className={`hover:bg-primary-50 hover:after:opacity-0 hover:text-primary rounded-lg duration-200 font-medium py-2 relative ${
            pathClass("jobs").menu
          }`}
          isBlock
          href="/dashboard/jobs"
          color="foreground"
          size="sm"
        >
          <div
            className={`${
              pathClass("jobs").attachment
            } rounded-l h-full bg-primary absolute -right-6 top-0 duration-200 transition-all`}
          ></div>
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full">
              <Briefcase size={14} />
            </span>
            Jobs
          </div>
        </Link>
        <Link
          className={`hover:bg-primary-50 hover:after:opacity-0 hover:text-primary rounded-lg duration-200 font-medium py-2 relative ${
            pathClass("candidates").menu
          }`}
          isBlock
          href="/dashboard/candidates"
          color="foreground"
          size="sm"
        >
          <div
            className={`${
              pathClass("candidates").attachment
            } rounded-l h-full bg-primary absolute -right-6 top-0 duration-200 transition-all`}
          ></div>
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full">
              <KanbanSquare size={14} />
            </span>
            Candidates
          </div>
        </Link>
        <Link
          isBlock
          className={`hover:bg-primary-50 hover:after:opacity-0 hover:text-primary rounded-lg duration-200 font-medium py-2 relative ${
            pathClass("assessments").menu
          }`}
          href="/dashboard/assessments"
          color="foreground"
          size="sm"
        >
          <div
            className={`${
              pathClass("assessments").attachment
            } rounded-l h-full bg-primary absolute -right-6 top-0 duration-200 transition-all`}
          ></div>
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full">
              <MessagesSquare size={14} strokeWidth={2} />
            </span>
            Assessments
          </div>
        </Link>
        <p className="select-none uppercase pl-2 font-medium text-xs text-neutral-400 mt-6">
          Settings
        </p>
        <Link
          className={`hover:bg-primary-50 hover:after:opacity-0 hover:text-primary rounded-lg duration-200 font-medium py-2 relative ${
            pathClass("email-settings").menu
          }`}
          isBlock
          href="/dashboard/email-settings"
          color="foreground"
          size="sm"
        >
          <div
            className={`${
              pathClass("email-settings").attachment
            } rounded-l h-full bg-primary absolute -right-6 top-0 duration-200 transition-all`}
          ></div>
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full">
              <Users2 size={14} strokeWidth={2} />
            </span>
            Email Settings
          </div>
        </Link>
        <Link
          className={`hover:bg-primary-50 hover:after:opacity-0 hover:text-primary rounded-lg duration-200 font-medium py-2 relative ${
            pathClass("team").menu
          }`}
          isBlock
          href="/dashboard/team"
          color="foreground"
          size="sm"
        >
          <div
            className={`${
              pathClass("team").attachment
            } rounded-l h-full bg-primary absolute -right-6 top-0 duration-200 transition-all`}
          ></div>
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full">
              <Users2 size={14} strokeWidth={2} />
            </span>
            Team
          </div>
        </Link>
        <Link
          className={`hover:bg-primary-50 hover:after:opacity-0 hover:text-primary rounded-lg duration-200 font-medium py-2 relative ${
            pathClass("email-template").menu
          }`}
          isBlock
          href="/dashboard/email-template"
          color="foreground"
          size="sm"
        >
          <div
            className={`${
              pathClass("email-template").attachment
            } rounded-l h-full bg-primary absolute -right-6 top-0 duration-200 transition-all`}
          ></div>
          <div className="flex items-center gap-4">
            <span className="p-1.5 rounded-full">
              <Mails size={14} strokeWidth={2} />
            </span>
            Email Templates
          </div>
        </Link>
      </div>
      <Dropdown placement="top-end">
        <DropdownTrigger>{children}</DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            startContent={<Settings size={16} />}
            key="preferences"
            description="Account settings"
          >
            Preferences
          </DropdownItem>
          <DropdownItem
            startContent={<LogOut size={16} />}
            className="text-danger"
            key="logout"
            color="danger"
            onClick={() => signOut()}
            description="Sign-out from your account"
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
