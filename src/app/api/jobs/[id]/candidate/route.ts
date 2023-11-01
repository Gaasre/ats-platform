import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if the job is active and not expired
    const job = await prisma.job.findFirst({
      where: {
        id: params.id,
        active: true,
        applicationDeadline: {
          gte: new Date(),
        },
      },
      select: {
        stages: {
          where: {
            order: 0,
          },
        },
        form: {
          include: {
            titleField: true,
            paragraphField: true,
            radioField: true,
            dropdownField: true,
            formField: true,
            fileField: true,
          },
        },
      },
    });

    if (!job || job.stages.length == 0) {
      return new Response(
        JSON.stringify({
          error: "Cannot apply to this job. Either non-existant or expired",
        }),
        {
          status: 404,
        }
      );
    }

    const stageId = job.stages[0].id;
    const data = await request.formData();
    const fileKeys = [
      ...(JSON.parse(data.get("fileKeys") as string) as string[]),
      "resume",
    ];
    const customFields: {
      id: string;
      name: string | undefined;
      value: string;
    }[] = [];

    data.forEach((value, key) => {
      if (
        ![
          ...fileKeys,
          "email",
          "firstName",
          "lastName",
          "phone",
          "fileKeys",
        ].includes(key)
      ) {
        const formFound = job.form.find((form) => form.id == key);
        const name =
          formFound?.valueType == "TITLE"
            ? formFound.titleField?.value
            : formFound?.valueType == "RADIO"
            ? formFound?.radioField?.label
            : formFound?.valueType == "PARAGRAPH"
            ? formFound?.paragraphField?.value
            : formFound?.valueType == "FORM"
            ? formFound?.formField?.label
            : formFound?.valueType == "DROPDOWN"
            ? formFound?.dropdownField?.label
            : formFound?.valueType == "FILE"
            ? formFound?.fileField?.label
            : "";
        customFields.push({
          id: key,
          name: name,
          value: value as string,
        });
      }
    });

    await prisma.candidate.create({
      data: {
        stageId: stageId,
        email: data.get("email") as string,
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        phone: data.get("phone") as string,
        customFields: JSON.stringify(customFields),
        date: new Date(),
        jobId: params.id,
      },
    });

    // await Promise.all(
    //   fileKeys.map(async (key) => {
    //     const file = data.get(key) as unknown as File;
    //     // POC
    //     // Change this with S3
    //     const bytes = await file.arrayBuffer();
    //     const buffer = Buffer.from(bytes);
    //     const path = join("/", "tmp", file.name);
    //     await writeFile(path, buffer);
    //   })
    // );

    return new NextResponse(
      JSON.stringify({
        status: "success",
        message: "Candidate application success",
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
