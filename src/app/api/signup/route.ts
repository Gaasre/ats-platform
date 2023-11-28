import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be 8 or more characters long" }),
  invitationId: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const { name, email, password, invitationId } =
      (await req.json()) as z.infer<typeof userSchema>;

    const parsed = userSchema.safeParse({
      name,
      email,
      password,
      invitationId,
    });

    if (!parsed.success) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: parsed.error.errors[0].message,
        }),
        { status: 403 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser && !parsed.data.invitationId) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: "Email address already used.",
        }),
        { status: 403 }
      );
    }

    const hashed_password = await hash(password, 12);
    let user: User | null = null;

    if (parsed.data.invitationId) {
      const invitation = await prisma.invitation.findFirst({
        where: {
          id: parsed.data.invitationId,
          status: "PENDING",
        },
      });

      if (!invitation) {
        return new NextResponse(
          JSON.stringify({
            status: "error",
            message: "Invitation not found.",
          }),
          { status: 404 }
        );
      }

      [, user] = await Promise.all([
        prisma.invitation.update({
          where: { id: parsed.data.invitationId },
          data: {
            status: "ACCEPTED",
          },
        }),
        prisma.user.update({
          where: { id: invitation.userId },
          data: {
            name,
            passwordHash: hashed_password,
          },
        }),
      ]);
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          passwordHash: hashed_password,
        },
      });
    }

    return NextResponse.json({
      status: "success",
      user: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
