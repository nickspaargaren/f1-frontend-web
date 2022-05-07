import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    apikey, driver, time, circuit,
  } = req.query;

  if (apikey === process.env.API_KEY) {
    switch (req.method) {
      case 'GET':
        try {
          const times = await prisma.times.findMany({
            where: {
              gamertag: driver as string,
            },
          });

          if (times.length) {
            res.status(200).json({ success: true, data: { times } });
          } else {
            res.status(200).json({ success: false, data: { times: `No times set for user ${driver}` } });
          }
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const newtime = await prisma.times.upsert({
            where: {
              gamertag_circuit: {
                gamertag: driver,
                circuit,
              },
            },
            update: {
              time: time as string,
              gamertag: driver as string,
              circuit: circuit as string,
            },
            create: {
              time: time as string,
              gamertag: driver as string,
              circuit: circuit as string,
            },
          });

          const times = await prisma.times.findMany({
            where: {
              circuit: circuit as string,
            },
            take: 1,
            orderBy: {
              time: 'asc',
            },
          });

          let newWinner;
          if (times) {
            newWinner = await prisma.circuits.update({
              where: {
                name: circuit as string,
              },
              data: {
                winner: times[0].gamertag,
              },
            });
          }

          res.status(201).json({ success: true, data: newtime, newWinner });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      default:
        res.status(400).json({ success: false });
        break;
    }
  } else {
    res.status(400).json({ success: false, data: 'Invalid API key' });
  }
}
