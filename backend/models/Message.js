const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Message', messageSchema);
