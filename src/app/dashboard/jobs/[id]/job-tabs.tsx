"use client";

import { Badge } from "@nextui-org/badge";
import { Tab, Tabs } from "@nextui-org/tabs";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  id: string;
};

export default function JobTabs({ id }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const page = `/dashboard/jobs/${id}/`;

  const changeTab = (key: string) => {
    if (key == "candidates") {
      router.push(page);
    } else {
      router.push(page + key);
    }
  };

  const selectedTab = () => {
    const currentPage = pathname.split("/").pop();
    if (currentPage == "details" || currentPage == "timeline") {
      return currentPage;
    } else {
      return "candidates";
    }
  };

  return (
    <div className="mb-6">
      <Tabs
        selectedKey={selectedTab()}
        onSelectionChange={(key) => changeTab(key.toString())}
        aria-label="Job Tabs"
      >
        <Tab key="candidates" title={
          <Badge content="5" color="danger">
            <span className="mr-3">Candidates</span>
          </Badge>
        }></Tab>
        <Tab key="details" title="Job Details"></Tab>
        <Tab key="timeline" title="Timeline & Notes"></Tab>
      </Tabs>
    </div>
  );
}
