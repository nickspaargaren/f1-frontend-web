import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.apikey !== process.env.API_KEY) {
    res.status(401).json({ success: false, data: "Invalid API key" });
  }

  switch (req.method) {
    case "GET":
      try {
        const circuits = await prisma.circuits.findMany({
          select: {
            name: true,
            description: true,
            flag: true,
            times: {
              select: { time: true, gamertag: true },
              take: 1,
              orderBy: [
                {
                  time: "asc",
                },
              ],
            },
          },
        });

        res.status(200).json({ success: true, data: { circuits } });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
