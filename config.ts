import mongoose from 'mongoose';

const { MONGODBURL } = process.env;

if (!MONGODBURL) {
  throw new Error(
    'Please define the MONGODBURL environment variable inside .env.local',
  );
}

async function database() {
  mongoose.connect(MONGODBURL as string);
}

export default database;
