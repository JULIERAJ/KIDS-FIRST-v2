const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationUserSchema = new Schema({
  userId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Conversation_User', conversationUserSchema);
