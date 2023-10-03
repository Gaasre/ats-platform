import { Button } from "@nextui-org/button";
import { ChevronLeft } from "lucide-react";
import JobTabs from "./job-tabs";
import { Link } from "@nextui-org/link";

export default function JobLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    id: string;
  };
}) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Button href="/dashboard/jobs"
      as={Link} isIconOnly color="primary" variant="flat" aria-label="Back">
          <ChevronLeft />
        </Button>
        <div>
          <p className="text-foreground-500 text-sm font-semibold uppercase">
            Senior
          </p>
          <h1 className="text-2xl font-bold">Product Designer</h1>
          <div className="flex gap-2 items-center text-xs text-foreground-400">
            <p>Berlin, Germany</p>
            <p className="font-bold text-lg leading-none mb-1.5">.</p>
            <p>Remote</p>
          </div>
        </div>
      </div>
      <JobTabs id={params.id as string}></JobTabs>
      {children}
    </div>
  );
}
