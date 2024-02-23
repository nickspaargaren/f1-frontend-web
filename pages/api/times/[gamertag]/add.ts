import { PrismaClient } from "@prisma/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { apikeySchema } from "@/lib/schemas";

const prisma = new PrismaClient();

export const addTimeSchema = z.object({
  apikey: apikeySchema,
  gamertag: z.string({
    required_error: "gamertag is required",
    invalid_type_error: "gamertag must be a string",
  }),
  time: z.string({
    required_error: "time is required",
    invalid_type_error: "time must be a string",
  }),
  circuitId: z.string({
    required_error: "circuitId is required",
    invalid_type_error: "circuitId must be a string",
  }),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { apikey, gamertag, time, circuitId } = req.query;

  const response = addTimeSchema.safeParse({
    apikey,
    gamertag,
    time,
    circuitId,
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

  const circuitIdInt = parseInt(response.data.circuitId);

  switch (req.method) {
    case "POST":
      try {
        const updateTime = await prisma.times.upsert({
          where: {
            timeUpdateId: {
              circuitId: circuitIdInt,
              gamertag: response.data.gamertag,
            },
          },
          update: {
            time: response.data.time,
          },
          create: {
            time: response.data.time,
            gamertag: response.data.gamertag,
            circuitId: circuitIdInt,
          },
        });

        const circuitData = await prisma.circuits.findUnique({
          where: {
            id: circuitIdInt,
          },
          select: {
            name: true,
          },
        });

        const circuitName = circuitData?.name || circuitIdInt;

        if (process.env.NODE_ENV === "production") {
          axios.post(
            "https://api.resend.com/emails",
            {
              from: "Racetijden <info@racetijden.nl>",
              to: ["info@racetijden.nl"],
              subject: `New time set by ${response.data.gamertag}!`,
              text: `${response.data.gamertag} set a new time (${response.data.time}) on ${circuitName}`,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.RESEND_MAIL_API_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
        }

        res.status(201).json({ success: true, data: updateTime });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
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
