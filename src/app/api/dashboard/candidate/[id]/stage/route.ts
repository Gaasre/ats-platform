import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { actionQueue } from "@/lib/queues";

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

    const candidate = await prisma.candidate.update({
      data: { stageId: parsed.data.stageId },
      where: { id: params.id },
    });

    // see if the new stage has any action
    const stage = await prisma.stage.findFirst({
      where: {
        id: parsed.data.stageId,
      },
      select: {
        order: true,
        actions: {
          include: {
            emailTemplate: true,
            note: true,
          },
        },
      },
    });

    if (
      stage?.order &&
      stage?.order > 0 &&
      stage?.actions &&
      stage.actions.length > 0
    ) {
      // send actions + company email settings to actionQueue
      await actionQueue.add("executeActions", {
        candidate,
        stage,
        company: session.user.Company,
      });
    }

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
