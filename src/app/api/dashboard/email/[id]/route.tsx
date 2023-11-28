import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const EmailSchema = z.object({
  body: z.string(),
  name: z.string(),
  subject: z.string(),
});

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    await prisma.emailTemplate.delete({
      where: { id: params.id, companyId: session.user.companyId },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
      }),
      { status: 200 }
    );
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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const template = await prisma.emailTemplate.findFirst({
      where: { id: params.id, companyId: session.user.companyId },
    });

    return new NextResponse(JSON.stringify(template), { status: 200 });
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

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
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

    const emailReq = (await request.json()) as z.infer<typeof EmailSchema>;
    const parsed = EmailSchema.safeParse(emailReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
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

    const { body, name, subject } = parsed.data;

    const template = await prisma.emailTemplate.update({
      where: {
        id,
        companyId: session.user.companyId,
      },
      data: { body, name, subject },
    });

    return new NextResponse(JSON.stringify(template), {
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
