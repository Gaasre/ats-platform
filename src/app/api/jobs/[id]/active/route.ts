import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const activeSchema = z.object({
  active: z.boolean(),
});

export async function PATCH(
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

    const activeReq = (await request.json()) as z.infer<typeof activeSchema>;
    const parsed = activeSchema.safeParse(activeReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: `${parsed.error.errors[0].message} in ${parsed.error.errors[0].path}`,
        }),
        { status: 403 }
      );
    }

    await prisma.job.update({
      data: { active: parsed.data.active },
      where: { id: params.id },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "Job successfully edited",
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
