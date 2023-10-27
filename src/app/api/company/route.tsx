import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";

const companySchema = z.object({
  name: z.string().min(1).max(100),
  website: z.string().url(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ error: "You must be authenticated to do this." }),
        {
          status: 401,
        }
      );
    }

    if (session.user?.companyId) {
      return new Response(
        JSON.stringify({
          error:
            "You are already part of a company. You cannot create a new company",
        }),
        {
          status: 400,
        }
      );
    }

    const newCompany = (await request.json()) as z.infer<typeof companySchema>;

    const company = await prisma.company.create({
      data: {
        ...newCompany,
        headId: session.user.id,
      },
    });

    return new Response(JSON.stringify(company), {
      status: 201,
    });
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
