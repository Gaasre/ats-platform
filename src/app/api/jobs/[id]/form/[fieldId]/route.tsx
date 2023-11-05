import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const fieldSchema = z.object({
  valueType: z.enum([
    "TITLE",
    "PARAGRAPH",
    "RADIO",
    "DROPDOWN",
    "GRID",
    "FORM",
    "FILE",
  ]),
  value: z.any(),
});

export async function DELETE(
  request: Request,
  { params: { id, fieldId } }: { params: { id: string; fieldId: string } }
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

    await prisma.customField.delete({
      where: {
        id: fieldId,
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
  { params: { id, fieldId } }: { params: { id: string; fieldId: string } }
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

    const fieldReq = (await request.json()) as z.infer<typeof fieldSchema>;
    const parsed = fieldSchema.safeParse(fieldReq);

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    switch (parsed.data.valueType) {
      case "TITLE":
        await prisma.titleField.update({
          where: {
            customFieldId: fieldId,
          },
          data: parsed.data.value,
        });
        break;
      case "PARAGRAPH":
        await prisma.paragraphField.update({
          where: {
            customFieldId: fieldId,
          },
          data: parsed.data.value,
        });
        break;
      case "RADIO":
        await prisma.radioField.update({
          where: {
            customFieldId: fieldId,
          },
          data: parsed.data.value,
        });
        break;
      case "DROPDOWN":
        await prisma.dropdownField.update({
          where: {
            customFieldId: fieldId,
          },
          data: parsed.data.value,
        });
        break;
      case "FORM":
        await prisma.formField.update({
          where: {
            customFieldId: fieldId,
          },
          data: parsed.data.value,
        });
        break;
      case "FILE":
        await prisma.fileField.update({
          where: {
            customFieldId: fieldId,
          },
          data: parsed.data.value,
        });
        break;
      default:
        return new NextResponse(
          JSON.stringify({
            status: "error",
            message: "Invalid field type.",
          }),
          { status: 403 }
        );
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
