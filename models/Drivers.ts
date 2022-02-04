import mongoose from 'mongoose';

const { Schema } = mongoose;

const DriverSchema = new Schema({
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
