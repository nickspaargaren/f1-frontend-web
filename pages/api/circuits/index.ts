import type { NextApiRequest, NextApiResponse } from 'next';

import database from '@/config';
import Circuits from '@/models/Circuits';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.apikey === process.env.API_KEY) {
    await database();

    switch (req.method) {
      case 'GET':
        try {
          const circuits = await Circuits.find({});

          res.status(200).json({ success: true, data: { circuits } });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
      case 'POST':
        try {
          const user = await Circuits.create(req.body);

          res.status(201).json({ success: true, data: user });
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
