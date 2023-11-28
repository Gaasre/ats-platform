import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get the user from the session
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
        JSON.stringify({ error: "You must have a company to do this." }),
        {
          status: 401,
        }
      );
    }

    const emailTemplates = await prisma.emailTemplate.findMany({
      where: {
        companyId: session.user.companyId,
      },
      select: {
        id: true,
        name: true,
        subject: true,
      },
    });

    return new NextResponse(
      JSON.stringify(emailTemplates ? emailTemplates : []),
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

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ error: "You must be authenticated to do this." }),
        {
          status: 401,
        }
      );
    }

    if (!session.user?.companyId) {
      return new Response(
        JSON.stringify({
          error: "You must have a company to do this.",
        }),
        {
          status: 400,
        }
      );
    }

    const email = await prisma.emailTemplate.create({
      data: {
        body: "",
        name: "New Template",
        subject: "",
        companyId: session.user.companyId,
      },
    });

    return new Response(JSON.stringify(email), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "The server failed to process the request." }),
      {
        status: 500,
      }
    );
  }
}
