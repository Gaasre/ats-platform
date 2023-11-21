import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const ActionType = z.enum(["EMAIL", "NOTE"]);

const ActionSchema = z.object({
  type: ActionType,
  emailTemplateId: z.string().optional(),
  noteId: z.string().optional(),
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

    await prisma.action.delete({
      where: { id: params.id },
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

    const actionReq = (await request.json()) as z.infer<typeof ActionSchema>;
    const parsed = ActionSchema.safeParse(actionReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    const { type, emailTemplateId, noteId } = parsed.data;

    const action = await prisma.action.update({
      where: {
        id,
      },
      data: { type, emailTemplateId, noteId },
    });

    return new NextResponse(JSON.stringify(action), {
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
