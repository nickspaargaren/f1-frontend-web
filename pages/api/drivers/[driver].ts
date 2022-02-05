import type { NextApiRequest, NextApiResponse } from 'next';

import database from '@/config';
import Drivers from '@/models/Drivers';
import Times from '@/models/Times';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { apikey, driver, times } = req.query;
  if (apikey === process.env.API_KEY) {
    const { method } = req;

    await database();

    switch (method) {
      case 'GET':
        try {
          const drivers = await Drivers.find({ gamertag: driver });

          if (drivers.length) {
            if (times === 'true') {
              const timesData = await Times.find({ gamertag: driver });

              const driverData = {
                driver: drivers[0],
                times: timesData,
              };

              res.status(200).json({ success: true, data: driverData });
            } else {
              res.status(200).json({ success: true, data: { driver: drivers[0] } });
            }
          } else {
            res.status(400).json({ success: false, data: 'Driver not found' });
          }
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const createDriver = await Drivers.create({ gamertag: driver });
          res.status(201).json({ success: true, data: createDriver });
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
