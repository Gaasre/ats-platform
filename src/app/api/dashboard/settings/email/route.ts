import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import z from "zod";

const settingsSchema = z.object({
  emailHost: z.string(),
  emailPort: z.number(),
  emailUser: z.string(),
  emailPass: z.string(),
});

export async function PUT(request: Request) {
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

    const settingsReq = (await request.json()) as z.infer<
      typeof settingsSchema
    >;
    const parsed = settingsSchema.safeParse(settingsReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          error: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    const { emailHost, emailPort, emailUser, emailPass } = parsed.data;

    const company = await prisma.company.update({
      where: {
        id: session.user.companyId,
      },
      data: { emailHost, emailPort, emailUser, emailPass },
    });

    return new NextResponse(JSON.stringify(company), {
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
