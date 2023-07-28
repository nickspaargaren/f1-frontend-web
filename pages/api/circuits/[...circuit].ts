import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { apikey, circuit } = req.query;

  if (apikey !== process.env.API_KEY) {
    res.status(401).json({ success: false, data: "Invalid API key" });
  }
  const { method } = req;

  switch (method) {
    case "GET":
      if (!circuit) {
        return;
      }

      try {
        const circuits = await prisma.circuits.findUnique({
          where: {
            name: circuit[0],
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

        if (circuits) {
          res
            .status(200)
            .json({ success: true, data: { circuits: [circuits] } });
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
