import type { NextApiRequest, NextApiResponse } from 'next';

import database from '@/config';
import Circuits from '@/models/Circuits';
import Times from '@/models/Times';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    apikey, driver, time, circuit,
  } = req.query;

  if (apikey === process.env.API_KEY) {
    const { method } = req;

    await database();

    switch (method) {
      case 'GET':
        try {
          const times = await Times.find({ gamertag: driver });

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
          const newtime = await Times.updateOne(
            { gamertag: driver, circuit },
            {
              time, gamertag: driver, circuit, creationDate: new Date(),
            },
            { upsert: true, setDefaultsOnInsert: true },
          );

          // update winner
          const times = await Times.find({ circuit }).sort('time');
          let newWinner;
          if (times.length > 0) {
            newWinner = await Circuits.updateOne({ name: circuit }, { winner: times[0].gamertag }, { upsert: true, setDefaultsOnInsert: true });
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
