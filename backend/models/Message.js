const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation_User',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
=======
const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  messageInformation: {
    type: String,
    required: true,
    maxlenght: 5000,
  },
});
>>>>>>> 17a7ae8 (work on msg feature)

module.exports = mongoose.model('Message', messageSchema);
