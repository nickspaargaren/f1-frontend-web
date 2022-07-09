import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { apikey, gamertag, time, circuit, circuitId } = req.query;

  if (apikey !== process.env.API_KEY) {
    res.status(401).json({ success: false, data: "Invalid API key" });
  }

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
        const circuitIdInt = parseInt(circuitId as string);

        const updateTime = await prisma.times.updateMany({
          where: {
            circuitId: circuitIdInt as number,
            gamertag: gamertag as any,
          },
          data: { time: time as any },
        });

        if (updateTime.count === 0) {
          const newTime = await prisma.times.create({
            data: {
              time: time as string,
              gamertag: gamertag as string,
              circuitId: circuitIdInt as any,
            },
          });
        }

        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deleteTime = await prisma.times.deleteMany({
          where: {
            gamertag: gamertag as string,
            circuit: circuit as string,
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
      res.status(400).json({ success: false });
      break;
  }
}
