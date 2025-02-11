import mongoose, { Schema } from 'mongoose';

/**
 * TODO: Create the Room Schema for storing roomId, owner, members[], videoQueue[],...
 */
const membersSchema = new mongoose.Schema({
  roomId: {
    type: String,
    unique: true,
    required: true,
  },

  members: {
    type: [
      {
        name: String,
        memberId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        profileImg: String,
        _id: false,
      },
    ],
    ref: 'User',
    default: [],
    unique: true,
    validate: {
      validator: (members) => members.length <= 50,
      message: 'A room cannot have more than 50 members',
    },
  },
});

export default mongoose.model('Member', membersSchema);
