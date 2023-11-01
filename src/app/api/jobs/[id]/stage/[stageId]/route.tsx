import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const stageSchema = z.object({
  title: z.string(),
  color: z.string(),
});

const stageDirectionSchema = z.object({
  direction: z.enum(["up", "down"]),
});

export async function DELETE(
  request: Request,
  { params: { id, stageId } }: { params: { id: string; stageId: string } }
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

    await prisma.stage.delete({
      where: {
        id: stageId,
      },
    });

    return new NextResponse(JSON.stringify({}), {
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

export async function PUT(
  request: Request,
  { params: { id, stageId } }: { params: { id: string; stageId: string } }
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

    const stageReq = (await request.json()) as z.infer<typeof stageSchema>;
    const parsed = stageSchema.safeParse(stageReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    const stage = await prisma.stage.update({
      where: {
        id: stageId,
      },
      data: {
        title: stageReq.title,
        color: stageReq.color,
      },
    });

    return new NextResponse(JSON.stringify(stage), {
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

export async function PATCH(
  request: Request,
  { params: { id, stageId } }: { params: { id: string; stageId: string } }
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

    const stageReq = (await request.json()) as z.infer<
      typeof stageDirectionSchema
    >;
    const parsed = stageDirectionSchema.safeParse(stageReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    const stage = await prisma.stage.findUnique({
      where: {
        id: stageId,
      },
    });

    if (!stage) {
      return new NextResponse(
        JSON.stringify({ error: "The stage does not exist." }),
        {
          status: 404,
        }
      );
    }

    if (stageReq.direction === "up") {
      if (stage.order === 0) {
        return new NextResponse(
          JSON.stringify({ error: "The stage cannot be moved up." }),
          {
            status: 400,
          }
        );
      }

      const upStage = await prisma.stage.findFirst({
        where: {
          jobId: stage.jobId,
          order: stage.order - 1,
        },
      });

      if (!upStage) {
        return new NextResponse(
          JSON.stringify({ error: "The stage cannot be moved up." }),
          {
            status: 404,
          }
        );
      }

      await prisma.stage.update({
        where: {
          id: stageId,
        },
        data: {
          order: stage.order - 1,
        },
      });

      await prisma.stage.update({
        where: {
          id: upStage.id,
        },
        data: {
          order: stage.order,
        },
      });
    } else {
      const downStage = await prisma.stage.findMany({
        where: {
          jobId: stage.jobId,
        },
        orderBy: {
          order: "desc",
        },
        take: 1,
      });

      if (stage.order === downStage[0].order) {
        return new NextResponse(
          JSON.stringify({ error: "The stage cannot be moved down." }),
          {
            status: 400,
          }
        );
      }

      await prisma.stage.update({
        where: {
          id: stageId,
        },
        data: {
          order: stage.order + 1,
        },
      });

      await prisma.stage.update({
        where: {
          id: downStage[0].id,
        },
        data: {
          order: stage.order,
        },
      });
    }

    return new NextResponse(JSON.stringify({}), {
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
