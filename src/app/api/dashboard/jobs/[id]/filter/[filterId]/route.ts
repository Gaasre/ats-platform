import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const filterSchema = z.object({
  field: z.string(),
  operator: z.enum(["EQUAL", "HIGHER", "LOWER", "NOTEQUAL", "INCLUDES"]),
  value: z.string(),
});

export async function DELETE(
  request: Request,
  { params: { id, filterId } }: { params: { id: string; filterId: string } }
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

    await prisma.filter.delete({
      where: {
        id: filterId,
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
  { params: { id, filterId } }: { params: { id: string; filterId: string } }
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

    const filterReq = (await request.json()) as z.infer<typeof filterSchema>;
    const parsed = filterSchema.safeParse(filterReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    await prisma.filter.update({
      where: {
        id: filterId,
      },
      data: {
        value: parsed.data.value,
        field: parsed.data.field,
        operator: parsed.data.operator,
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
