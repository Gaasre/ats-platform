import DashboardHeader from "@/components/dashboard-header";
import "../globals.css";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import LeftMenu from "@/components/left-menu";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen">
      <div className="flex w-full">
        <div className="border-r border-foreground-200 h-screen">
          <LeftMenu>
            <User
              as="button"
              className="mb-4 transition-transform"
              name={session?.user.name || "Unknown"}
              description={session?.user.Company?.name || "No Company"}
              avatarProps={{
                isBordered: true,
                src: "https://i.pravatar.cc/150?img=68",
              }}
            />
          </LeftMenu>
        </div>
        <div className="grow p-8 bg-[#f5f6fa] overflow-y-auto h-screen">
          {children}
        </div>
      </div>
    </main>
  );
}
