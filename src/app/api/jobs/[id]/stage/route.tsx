import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const stageSchema = z.object({
  title: z.string(),
  color: z.string(),
});

const stageOrderSchema = z.object({
  item1: z.object({
    id: z.string(),
    order: z.number(),
  }),
  item2: z.object({
    id: z.string(),
    order: z.number(),
  }),
});

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
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

    const stages = await prisma.stage.findMany({
      where: {
        jobId: params.id,
      },
      orderBy: {
        order: "asc",
      },
      include: {
        actions: {
          include: {
            note: true,
            emailTemplate: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return new NextResponse(JSON.stringify(stages), {
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

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
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

    let nextOrder = 0;

    const stages = await prisma.stage.findMany({
      where: {
        jobId: params.id,
      },
      orderBy: {
        order: "desc",
      },
      take: 1,
    });

    if (stages.length === 0) {
      nextOrder = 0;
    } else {
      nextOrder = stages[0].order + 1;
    }

    const pipeline = await prisma.stage.create({
      data: {
        title: stageReq.title,
        color: stageReq.color,
        jobId: params.id,
        order: nextOrder,
      },
    });

    return new NextResponse(JSON.stringify(pipeline), {
      status: 201,
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
  { params }: { params: { id: string } }
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

    const stageReq = (await request.json()) as z.infer<typeof stageOrderSchema>;
    const parsed = stageOrderSchema.safeParse(stageReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    await Promise.all([
      prisma.stage.update({
        data: {
          order: parsed.data.item1.order,
        },
        where: {
          id: parsed.data.item1.id,
        },
      }),
      prisma.stage.update({
        data: {
          order: parsed.data.item2.order,
        },
        where: {
          id: parsed.data.item2.id,
        },
      }),
    ]);

    return new NextResponse(JSON.stringify({ status: "success" }), {
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
