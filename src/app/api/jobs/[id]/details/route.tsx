import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

const jobSchema = z.object({
  title: z.string(),
  description: z.string(),
  country: z.string(),
  city: z.string(),
  applicationDeadline: z.string().datetime(),
  employmentType: z.enum(["Full-time", "Part-time"]),
  salary: z.number(),
  currency: z.enum(["EUR", "USD"]),
  experienceLevel: z.enum(["Entry-level", "Mid-level", "Senior"]),
  jobType: z.enum(["On-site", "Remote", "Hybrid"]),
  quota: z.number(),
  companyId: z.string(),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const job = await prisma.job.findUnique({
      where: {
        id: params.id,
      },
      include: {
        company: true,
      },
    });

    return new NextResponse(JSON.stringify(job), {
      status: 200,
    });
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const jobReq = (await request.json()) as z.infer<typeof jobSchema>;
    const parsed = jobSchema.safeParse(jobReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: `${parsed.error.errors[0].message} in ${parsed.error.errors[0].path}`,
        }),
        { status: 403 }
      );
    }

    const job = await prisma.job.update({
      where: {
        id: params.id,
      },
      data: parsed.data,
    });

    return new NextResponse(JSON.stringify(job), {
      status: 201,
    });
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
