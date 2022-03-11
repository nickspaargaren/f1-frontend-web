import mongoose from 'mongoose';

const TimesSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  gamertag: {
    type: String,
    required: true,
  },
  circuit: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Times || mongoose.model('Times', TimesSchema);
