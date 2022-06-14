import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.apikey === process.env.API_KEY) {
    switch (req.method) {
      case "GET":
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
          });

          res.status(200).json({ success: true, data: { times: [time[0]] } });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(400).json({ success: false, data: "Invalid API key" });
  }
}
