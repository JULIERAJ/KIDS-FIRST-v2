const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
const conversationUserSchema = new Schema(
  {
    userIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation_User', conversationUserSchema);
=======
const conversationSchema = new Schema({
  conveUser: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
  },
});

module.exports = mongoose.model('ConversationUser', conversationSchema);
>>>>>>> 17a7ae8 (work on msg feature)
