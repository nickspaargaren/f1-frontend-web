import { PrismaClient } from "@prisma/client";

import { apikeySchema } from "@/lib/schemas";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const response = apikeySchema.safeParse(searchParams.get("apikey"));

  if (!response.success) {
    const { errors } = response.error;

    return Response.json({
      error: { errors },
    });
  }

  if (searchParams.get("apikey") !== process.env.API_KEY) {
    Response.json(
      { success: false, data: "Invalid API key" },
      {
        status: 401,
      }
    );
  }

  try {
    const times = await prisma.times.findMany();

    return Response.json({ success: true, data: { times } });
  } catch (error) {
    return Response.json(
      { success: false },
      {
        status: 400,
      }
    );
  }
}
