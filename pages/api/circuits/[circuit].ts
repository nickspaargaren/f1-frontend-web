import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { apikeySchema } from "@/lib/schemas";

const prisma = new PrismaClient();

export const circuitsSchema = z.object({
  apikey: apikeySchema,
  circuit: z.string({
    required_error: "circuit is required",
    invalid_type_error: "circuit must be a string",
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { apikey, circuit } = req.query;

  const response = circuitsSchema.safeParse({ apikey, circuit });

  if (!response.success) {
    const { errors } = response.error;

    return res.status(400).json({
      error: { errors },
    });
  }

  if (apikey !== process.env.API_KEY) {
    res.status(401).json({ success: false, data: "Invalid API key" });
  }
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const circuitData = await prisma.circuits.findUnique({
          where: {
            name: response.data.circuit,
          },
          select: {
            name: true,
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
          res.status(200).json({
            success: true,
            data: { circuits: [circuitData] },
          });
        } else {
          res.status(400).json({ success: false, data: "Circuit not found" });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(405).json({
        success: false,
        error: { message: `Method ${req.method} Not Allowed` },
      });
      break;
  }
}
