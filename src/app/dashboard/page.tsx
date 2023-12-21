"use client";

import { DailyCandidateStats, SourceGraph } from "@/interfaces/stats";
import { getStats } from "@/lib/api";
import {
  Card,
  Col,
  BadgeDelta,
  Flex,
  Grid,
  Metric,
  Text,
  AreaChart,
  Title,
  DonutChart,
  Legend,
} from "@tremor/react";
import { useEffect, useState } from "react";

// const chartdata = [
//   {
//     date: "01 Jan",
//     LinkedIn: 28,
//     Indeed: 12,
//     Other: 26,
//   },
//   {
//     date: "02 Jan",
//     LinkedIn: 10,
//     Indeed: 14,
//     Other: 50,
//   },
//   {
//     date: "03 Jan",
//     LinkedIn: 13,
//     Indeed: 16,
//     Other: 24,
//   },
//   {
//     date: "04 Jan",
//     LinkedIn: 20,
//     Indeed: 6,
//     Other: 15,
//   },
//   {
//     date: "05 Jan",
//     LinkedIn: 16,
//     Indeed: 43,
//     Other: 37,
//   },
//   {
//     date: "06 Jan",
//     LinkedIn: 58,
//     Indeed: 34,
//     Other: 24,
//   },
//   {
//     date: "07 Jan",
//     LinkedIn: 20,
//     Indeed: 46,
//     Other: 32,
//   },
// ];

export default function DashboardPage() {
  const [stats, setStats] = useState<SourceGraph>([]);
  const [dailyApplicants, setDailyApplicants] = useState<DailyCandidateStats>();
  const [activeJobs, setActiveJobs] = useState(0);
  const [expiredJobs, setExpiredJobs] = useState(0);
  const [filterStats, setFilterStats] = useState<
    { name: string; value: number }[]
  >([]);

  useEffect(() => {
    getStats().then((res) => {
      setStats(res.sourceGraph);
      setDailyApplicants(res.candidates);
      setActiveJobs(res.activeJobs);
      setExpiredJobs(res.expiredJobs);
      setFilterStats(res.filter);
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bol mb-4">Overview</h1>
      <Grid numItemsMd={1} numItemsLg={3} className="gap-6 mt-6">
        <Col numColSpan={1} numColSpanLg={2}>
          <Grid numItemsMd={2} numItemsLg={4} className="gap-6 mt-6">
            <Card>
              <Flex alignItems="start">
                <div className="truncate">
                  <Text>Active Jobs</Text>
                  <Metric className="truncate">{activeJobs}</Metric>
                </div>
                <BadgeDelta deltaType="unchanged">-</BadgeDelta>
              </Flex>
            </Card>
            <Card>
              <Flex alignItems="start">
                <div className="truncate">
                  <Text>Expired Jobs</Text>
                  <Metric className="truncate">{expiredJobs}</Metric>
                </div>
                <BadgeDelta deltaType="unchanged">-</BadgeDelta>
              </Flex>
            </Card>
            <Card>
              <Flex alignItems="start">
                <div className="truncate">
                  <Text>New Applicants</Text>
                  <Metric className="truncate">{dailyApplicants?.count}</Metric>
                </div>
                <BadgeDelta deltaType={dailyApplicants?.deltaType}>
                  {dailyApplicants?.delta}%
                </BadgeDelta>
              </Flex>
            </Card>
            <Card>
              <Flex alignItems="start">
                <div className="truncate">
                  <Text>Hires</Text>
                  <Metric className="truncate">13</Metric>
                </div>
                <BadgeDelta deltaType="moderateDecrease">12%</BadgeDelta>
              </Flex>
            </Card>
          </Grid>
          <div className="mt-6">
            <Card>
              <Title>Applications received by source</Title>
              <AreaChart
                className="h-80 mt-4"
                data={stats}
                index="date"
                stack={true}
                showAnimation={true}
                categories={["Linkedin", "Indeed", "Other"]}
                colors={["indigo", "cyan", "red"]}
              />
            </Card>
          </div>
        </Col>
        <Card className="mt-6 h-fit">
          <Title>Filtered Candidates</Title>
          <Legend
            className="mt-6 mb-3"
            categories={["Filtered Candidates", "Non-Filtered Candidates"]}
            colors={["red", "emerald"]}
          />
          <DonutChart
            className="mt-6"
            data={filterStats}
            category="value"
            index="name"
            valueFormatter={(value) => value + " candidates"}
            showLabel={false}
            showAnimation={true}
            colors={["red", "emerald"]}
          />
        </Card>
      </Grid>
    </div>
  );
}
