import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const invitation = await prisma.invitation.findFirst({
      where: { id: params.id, status: "PENDING" },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            Company: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(invitation), {
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
