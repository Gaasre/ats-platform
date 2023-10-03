"use client"

import { Button } from "@nextui-org/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function DashboardHeader() {
  return (
    <div className="flex h-16 flex-row-reverse items-center">
      <Button
        isIconOnly
        color="danger"
        aria-label="Logout"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/signin" })}
      >
        <LogOut size={14} />
      </Button>
    </div>
  );
}
