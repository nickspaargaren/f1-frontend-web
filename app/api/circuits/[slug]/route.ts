import { PrismaClient } from "@prisma/client";
import { z } from "zod";

import { apikeySchema } from "@/lib/schemas";

const prisma = new PrismaClient();

const circuitsSchema = z.object({
  apikey: apikeySchema,
  slug: z.string({
    required_error: "slug is required",
    invalid_type_error: "slug must be a string",
  }),
});

type CircuitsSchema = Omit<z.infer<typeof circuitsSchema>, "apikey">;

export async function GET(
  request: Request,
  { params }: { params: CircuitsSchema }
) {
  const { searchParams } = new URL(request.url);

  const response = circuitsSchema.safeParse({
    apikey: searchParams.get("apikey"),
    slug: params.slug,
  });

  if (!response.success) {
    const { errors } = response.error;

    return Response.json(
      {
        error: { errors },
      },
      {
        status: 400,
      }
    );
  }

  if (searchParams.get("apikey") !== process.env.API_KEY) {
    return Response.json(
      { success: false, data: "Invalid API key" },
      {
        status: 401,
      }
    );
  }

  try {
    const circuitData = await prisma.circuits.findUnique({
      where: {
        slug: response.data.slug,
      },
      select: {
        name: true,
        slug: true,
        description: true,
        flag: true,
        id: true,
        times: {
          select: { time: true, gamertag: true },
          orderBy: {
            time: "asc",
          },
        },
      },
    });

    if (circuitData) {
      return Response.json({
        success: true,
        data: { circuits: [circuitData] },
      });
    } else {
      return Response.json(
        { success: false, data: "Circuit not found" },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json({ success: false }, { status: 400 });
  }
}
