import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const stageSchema = z.object({
  stageId: z.string(),
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

    const stageReq = (await request.json()) as z.infer<typeof stageSchema>;
    const parsed = stageSchema.safeParse(stageReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: `${parsed.error.errors[0].message} in ${parsed.error.errors[0].path}`,
        }),
        { status: 403 }
      );
    }

    await prisma.candidate.update({
      data: { stageId: parsed.data.stageId },
      where: { id: params.id },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "Candidate successfully moved.",
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
