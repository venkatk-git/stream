import mongoose from 'mongoose';

/**
 * TODO: Create the Room Schema for storing roomId, owner, members[], videoQueue[],...
 */
const roomSchema = new mongoose.Schema({});

export default mongoose.model('Rooms', roomSchema);
