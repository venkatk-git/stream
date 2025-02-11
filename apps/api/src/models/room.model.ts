import mongoose, { Schema } from 'mongoose';

/**
 * TODO: Create the Room Schema for storing roomId, owner, members[], videoQueue[],...
 */
const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: [],
    validate: {
      validator: (members: Schema.Types.ObjectId[]) => members.length <= 50,
      message: 'A room cannot have more than 50 members',
    },
  },
  videoQueue: {
    type: [
      {
        videoId: String,
        title: String,
        _id: false,
      },
    ],
    default: [
      {
        videoId: 'IZHGcU0U_W0',
        title:
          'MATTA | The Greatest Of All Time | Thalapathy Vijay | Venkat Prabhu |Yuvan Shankar Raja',
      },
    ],
  },
  playingVideo: {
    type: {
      videoId: String,
      timeStamp: {
        type: Number,
        default: 0,
      },
    },
    default: {
      videoId: 'IZHGcU0U_W0',
      timeStamp: 0,
    },
  },
  roomType: {
    type: String,
    enum: ['public', 'private'],
    default: 'public',
  },
});

export default mongoose.model('Room', roomSchema);
