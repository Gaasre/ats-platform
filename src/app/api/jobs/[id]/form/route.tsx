import { z } from "zod";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

const fieldSchema = z.object({
  valueType: z.enum([
    "TITLE",
    "PARAGRAPH",
    "RADIO",
    "DROPDOWN",
    "GRID",
    "FORM",
  ]),
});

export async function GET(
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

    const customFields = await prisma.customField.findMany({
      where: {
        jobId: id,
      },
      include: {
        titleField: true,
        paragraphField: true,
        radioField: true,
        dropdownField: true,
        gridField: {
          include: {
            value: {
              include: {
                formField: true,
              },
            },
          },
        },
        formField: true,
      },
    });

    return new NextResponse(JSON.stringify(customFields), {
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

    const customField = await prisma.customField.create({
      data: {
        valueType: fieldReq.valueType,
        jobId: id,
      },
    });

    switch (fieldReq.valueType) {
      case "TITLE":
        await prisma.titleField.create({
          data: {
            customFieldId: customField.id,
            value: "Title",
          },
        });
        break;
      case "PARAGRAPH":
        await prisma.paragraphField.create({
          data: {
            customFieldId: customField.id,
            value: "Paragraph",
          },
        });
        break;
      case "RADIO":
        await prisma.radioField.create({
          data: {
            customFieldId: customField.id,
            label: "Radio",
            orientation: "VERTICAL",
            value: [],
          },
        });
        break;
      case "DROPDOWN":
        await prisma.dropdownField.create({
          data: {
            customFieldId: customField.id,
            label: "Dropdown",
            value: [],
          },
        });
        break;
      case "GRID":
        await prisma.gridField.create({
          data: {
            customFieldId: customField.id,
          },
        });
        break;
      case "FORM":
        await prisma.formField.create({
          data: {
            customFieldId: customField.id,
            label: "Form",
          },
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

    const newCustomField = await prisma.customField.findUnique({
      where: {
        id: customField.id,
      },
      include: {
        titleField: true,
        paragraphField: true,
        radioField: true,
        dropdownField: true,
        gridField: {
          include: {
            value: true,
          },
        },
        formField: true,
      },
    });

    return new NextResponse(JSON.stringify(newCustomField), {
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
