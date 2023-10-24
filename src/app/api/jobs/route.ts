import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    // Get the user from the session
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ error: "You must be authenticated to do this." }),
        {
          status: 401,
        }
      );
    }

    if (!session.user.companyId) {
      return new Response(
        JSON.stringify({ error: "You must have a company to do this." }),
        {
          status: 401,
        }
      );
    }

    const jobs = await prisma.job.findMany({
      where: {
        companyId: session.user.companyId,
      },
      include: {
        _count: {
          select: {
            candidates: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(jobs), {
      status: 200,
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

export async function POST() {
  try {
    // Get the user from the session
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(
        JSON.stringify({ error: "You must be authenticated to do this." }),
        {
          status: 401,
        }
      );
    }

    // Check if the user has a company
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        companyId: true,
      },
    });

    if (!user?.companyId) {
      return new Response(
        JSON.stringify({ error: "You must have a company to do this." }),
        {
          status: 401,
        }
      );
    }

    // Create a new untitled job
    const job = await prisma.job.create({
      data: {
        title: "Untitled job",
        companyId: user.companyId,
      },
      select: {
        id: true,
      },
    });

    return new Response(JSON.stringify(job), {
      status: 200,
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
