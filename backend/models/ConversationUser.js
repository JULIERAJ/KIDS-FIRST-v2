const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
