import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { apikeySchema } from "@/lib/schemas";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = apikeySchema.safeParse(req.query.apikey);

  if (!response.success) {
    const { errors } = response.error;

    return res.status(400).json({
      error: { errors },
    });
  }

  if (req.query.apikey !== process.env.API_KEY) {
    res.status(401).json({ success: false, data: "Invalid API key" });
  }

  switch (req.method) {
    case "GET":
      try {
        const times = await prisma.times.findMany();

        res.status(200).json({ success: true, data: { times } });
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
