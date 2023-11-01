import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
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

    if (!session.user.companyId) {
      return new NextResponse(
        JSON.stringify({ error: "You must be in a company to do this." }),
        {
          status: 401,
        }
      );
    }

    const job = await prisma.job.findUnique({
      where: {
        id: params.id,
        companyId: session.user.companyId,
      },
      include: {
        company: true,
        stages: {
          orderBy: {
            order: "asc",
          },
          include: {
            candidates: true,
          },
        },
        form: {
          include: {
            titleField: true,
            paragraphField: true,
            radioField: true,
            dropdownField: true,
            formField: true,
            fileField: true,
          },
        },
      },
    });

    if (!job) {
      return new NextResponse(JSON.stringify({ error: "Job not found." }), {
        status: 404,
      });
    }

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
