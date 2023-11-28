import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { invitationQueue } from "@/lib/queues";

const memberSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  role: z.string(),
});

export async function GET(request: Request) {
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

    const team = await prisma.user.findMany({
      where: {
        companyId: session.user.companyId,
      },
      select: {
        id: true,
        email: true,
        image: true,
        name: true,
        role: true,
        invitation: {
          select: { status: true },
        },
      },
    });

    return new NextResponse(JSON.stringify(team), {
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

export async function POST(request: Request) {
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

    const memberReq = (await request.json()) as z.infer<typeof memberSchema>;
    const parsed = memberSchema.safeParse(memberReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    const foundUser = await prisma.user.findFirst({
      where: { email: parsed.data.email },
      select: { email: true },
    });

    if (foundUser) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "A user with this email address already exists",
        }),
        { status: 403 }
      );
    }

    const user = await prisma.user.create({
      data: {
        companyId: session.user.companyId,
        email: parsed.data.email,
        name: parsed.data.name,
        role: parsed.data.role,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    const invitation = await prisma.invitation.create({
      data: {
        status: "PENDING",
        userId: user.id,
      },
    });

    await invitationQueue.add("sendInvitation", {
      id: invitation.id,
      email: parsed.data.email,
      company: session.user.Company?.name,
    });

    return new NextResponse(JSON.stringify({ ...user, invitation }), {
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
