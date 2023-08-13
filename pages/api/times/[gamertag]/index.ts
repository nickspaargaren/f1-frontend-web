import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { apikeySchema } from "@/lib/schemas";

const prisma = new PrismaClient();

export const timeSchema = z.object({
  apikey: apikeySchema,
  gamertag: z.string({
    required_error: "gamertag is required",
    invalid_type_error: "gamertag must be a string",
  }),
});
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { apikey, gamertag } = req.query;

  const response = timeSchema.safeParse({
    apikey,
    gamertag,
  });

  if (!response.success) {
    const { errors } = response.error;

    return res.status(400).json({
      error: { errors },
    });
  }

  if (apikey !== process.env.API_KEY) {
    res.status(401).json({ success: false, data: "Invalid API key" });
  }

  switch (req.method) {
    case "GET":
      try {
        const times = await prisma.times.findMany({
          where: {
            gamertag: response.data.gamertag,
          },
        });

        if (times.length) {
          res.status(200).json({ success: true, data: { times } });
        } else {
          res.status(200).json({
            success: false,
            data: { times: `No times set for this gamertag` },
          });
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
