import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

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

    await prisma.job.delete({
      where: { id: params.id },
    });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "Job successfully deleted",
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
