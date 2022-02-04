import type { NextApiRequest, NextApiResponse } from 'next';

import database from '@/config';
import Times from '@/models/Times';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { apikey } = req.query;
  if (apikey === process.env.API_KEY) {
    const { method } = req;

    await database();

    switch (method) {
      case 'GET':
        try {
          const time = await Times.findOne().sort({ creationDate: 'desc' });

          res.status(200).json({ success: true, data: { times: [time] } });
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
