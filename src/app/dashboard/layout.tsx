import DashboardHeader from "@/components/dashboard-header";
import "../globals.css";
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
      <div className="px-8 border-b border-foreground-200">
        <DashboardHeader></DashboardHeader>
      </div>
      <div className="flex w-full">
        <div className="border-r border-foreground-200 h-[calc(100vh-65px)]">
          <LeftMenu></LeftMenu>
        </div>
        <div className="grow p-8 bg-gray-50 overflow-y-auto h-[calc(100vh-65px)]">
          {children}
        </div>
      </div>
    </main>
  );
}
