import { NextRequest, NextResponse } from "next/server";
import S3 from "@/lib/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import prisma from "@/lib/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import parsingQueue from "@/lib/queues";

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
    ];
    const customFields: {
      id: string;
      type: "text" | "file";
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
        if (value != "undefined") {
          customFields.push({
            id: key,
            type: "text",
            name: name,
            value: value != "null" ? (value as string) : "",
          });
        }
      }
    });

    const { id } = await prisma.candidate.create({
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

    const urls = await Promise.all(
      fileKeys.map(async (key) => {
        const command = new PutObjectCommand({
          Bucket: "ats-platform",
          Key: `${key}-${id}.${data.get(key)}`,
        });
        const url = await getSignedUrl(S3, command, { expiresIn: 60 });
        if (key != "resume") {
          const formFound = job.form.find((form) => form.id == key);
          customFields.push({
            id: key,
            type: "file",
            name: formFound?.fileField?.label,
            value: `https://pub-ccd5efe6d4824470bfd336f28a8d1322.r2.dev/${key}-${id}.${data.get(
              key
            )}`,
          });
        }
        return { key, url };
      })
    );

    await prisma.candidate.update({
      where: { id: id },
      data: {
        resumeLink: `https://pub-ccd5efe6d4824470bfd336f28a8d1322.r2.dev/resume-${id}.${data.get(
          "resume"
        )}`,
        customFields: JSON.stringify(customFields),
      },
    });

    // Add to queue for parsing
    // await parsingQueue.add("parseResume", { id });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        urls,
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
