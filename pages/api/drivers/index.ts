import type { NextApiRequest, NextApiResponse } from 'next';

import database from '@/config';
import Drivers from '@/models/Drivers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.apikey === process.env.API_KEY) {
    await database();

    switch (req.method) {
      case 'GET':
        try {
          const drivers = await Drivers.find({});
          res.status(200).json({ success: true, data: drivers });
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
