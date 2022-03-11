import mongoose from 'mongoose';

const DriverSchema = new mongoose.Schema({
  gamertag: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Driver || mongoose.model('Driver', DriverSchema);
