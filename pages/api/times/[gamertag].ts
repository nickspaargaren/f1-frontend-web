import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { apikey, gamertag, time, circuitId } = req.query;

  if (apikey !== process.env.API_KEY) {
    res.status(401).json({ success: false, data: "Invalid API key" });
  }

  const circuitIdInt = parseInt(circuitId as string);

  switch (req.method) {
    case "GET":
      try {
        const times = await prisma.times.findMany({
          where: {
            gamertag: gamertag as string,
          },
        });

        if (times.length) {
          res.status(200).json({ success: true, data: { times } });
        } else {
          res.status(200).json({
            success: false,
            data: { times: `No times set for user ${gamertag}` },
          });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const updateTime = await prisma.times.upsert({
          where: {
            timeUpdateId: {
              circuitId: circuitIdInt as number,
              gamertag: gamertag as any,
            },
          },
          update: {
            time: time as any,
          },
          create: {
            time: time as string,
            gamertag: gamertag as string,
            circuitId: circuitIdInt as number,
          },
        });

        res.status(201).json({ success: true, data: updateTime });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    case "DELETE":
      try {
        const deleteTime = await prisma.times.deleteMany({
          where: {
            circuitId: circuitIdInt as number,
            gamertag: gamertag as any,
          },
        });

        if (deleteTime.count === 0) {
          res
            .status(201)
            .json({ success: false, message: "Time does not exist" });
        } else {
          res
            .status(201)
            .json({ success: true, message: `Deleted ${gamertag}'s time ` });
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
