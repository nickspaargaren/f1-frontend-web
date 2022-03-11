import mongoose from 'mongoose';

const CircuitsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: false,
  },
  winner: {
    type: String,
    required: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Circuits || mongoose.model('Circuits', CircuitsSchema);
