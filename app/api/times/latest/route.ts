import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const time = await prisma.times.findMany({
      take: 1,
      orderBy: [
        {
          updatedAt: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      include: {
        circuit: {
          select: { name: true, slug: true, flag: true },
        },
      },
    });

    return Response.json({ success: true, data: { times: [time[0]] } });
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 400,
      }
    );
  }
}
