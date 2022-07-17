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
          include: {
            times: {
              orderBy: {
                time: "asc",
              },
              select: {
                time: true,
                gamertag: true,
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
      res.status(400).json({ success: false });
      break;
  }
}
