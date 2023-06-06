const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationUserSchema = new Schema(
  {
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation_User', conversationUserSchema);
