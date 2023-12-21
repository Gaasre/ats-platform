import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import moment from "moment";
import { Source } from "@prisma/client";
import { DailyCandidateStats } from "@/interfaces/stats";
import { DeltaType } from "@tremor/react";

async function filteredCandidates(
  companyId: string
): Promise<{ name: string; value: number }[]> {
  const [filtered, nonFiltered] = await Promise.all([
    prisma.candidate.count({
      where: {
        Job: { companyId },
        passedFilter: false,
      },
    }),
    prisma.candidate.count({
      where: {
        Job: { companyId },
        passedFilter: true,
      },
    }),
  ]);
  return [
    { name: "Filtered", value: filtered },
    { name: "Non-Filtered", value: nonFiltered },
  ];
}

async function getCandidateStatsForToday(
  companyId: string
): Promise<DailyCandidateStats> {
  const startDate = moment().startOf("day");
  const endDate = moment().endOf("day");

  const [currentDayCount, previousDayCount] = await Promise.all([
    prisma.candidate.count({
      where: {
        Job: { companyId },
        date: {
          gte: startDate.toDate(),
          lte: endDate.toDate(),
        },
      },
    }),
    prisma.candidate.count({
      where: {
        Job: { companyId },
        date: {
          gte: startDate.subtract(1, "day").toDate(),
          lt: startDate.endOf("day").toDate(),
        },
      },
    }),
  ]);

  const delta = currentDayCount - previousDayCount;
  let deltaType: DeltaType = "moderateIncrease";

  if (delta < 0) {
    deltaType = "moderateDecrease";
  } else if (delta === 0) {
    deltaType = "moderateIncrease";
  }

  const percentageDelta =
    previousDayCount !== 0 ? Math.abs((delta / previousDayCount) * 100) : 0;

  return {
    count: currentDayCount,
    deltaType,
    delta: percentageDelta.toFixed(1),
  };
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "You must be authenticated to do this." }),
        {
          status: 401,
        }
      );
    }

    if (!session.user?.companyId) {
      return new NextResponse(
        JSON.stringify({
          error: "You must have a company to do this.",
        }),
        {
          status: 400,
        }
      );
    }

    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().startOf("day");
    const dateRange: string[] = [];

    // Generate an array of date strings within the range
    for (
      let date = moment(startDate);
      date.isSameOrBefore(endDate);
      date.add(1, "day")
    ) {
      dateRange.push(date.startOf("day").format("DD MMM"));
    }

    const [counts, candidates, activeJobs, expiredJobs, filter] =
      await Promise.all([
        prisma.candidate.findMany({
          where: {
            Job: {
              companyId: session.user.companyId,
            },
            date: {
              gte: startDate.toISOString(),
            },
          },
          select: {
            date: true,
            source: true,
          },
        }),
        getCandidateStatsForToday(session.user.companyId),
        prisma.job.count({
          where: {
            active: true,
            companyId: session.user.companyId,
          },
        }),
        prisma.job.count({
          where: {
            active: true,
            companyId: session.user.companyId,
            applicationDeadline: {
              lt: new Date(),
            },
          },
        }),
        filteredCandidates(session.user.companyId),
      ]);

    const sourceGraph = counts.reduce((acc, entry) => {
      const { source, date } = entry;
      const day = moment(date).format("DD MMM"); // Format the date to 'DD MMM' (e.g., '07 Jan')

      // Find index of existing entry for this day in the accumulator
      const existingEntryIndex = acc.findIndex((item) => item.date === day);

      if (existingEntryIndex !== -1) {
        // Increment count for the specific source on this day
        acc[existingEntryIndex][source] = acc[existingEntryIndex][source] + 1;
      } else {
        // Create a new entry for this day and source
        const newEntry: { date: string } & Record<Source, number> = {
          date: day,
          Linkedin: 0,
          Indeed: 0,
          Other: 0,
        };
        newEntry[source] = 1;
        acc.push(newEntry);
      }

      return acc;
    }, [] as ({ date: string } & Record<Source, number>)[]);

    // Fill missing dates with default entries
    for (const day of dateRange) {
      const existingEntry = sourceGraph.find((item) => item.date === day);
      if (!existingEntry) {
        const newEntry: { date: string } & Record<Source, number> = {
          date: day,
          Linkedin: 0,
          Indeed: 0,
          Other: 0,
        };
        sourceGraph.push(newEntry);
      }
    }

    // Sort the stats array based on date
    sourceGraph.sort((a, b) =>
      moment(a.date, "DD MMM").diff(moment(b.date, "DD MMM"))
    );

    return new NextResponse(
      JSON.stringify({
        sourceGraph,
        candidates,
        activeJobs,
        expiredJobs,
        filter,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ error: "The server failed to process the request." }),
      {
        status: 500,
      }
    );
  }
}
