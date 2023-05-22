const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  conversationCreatedAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  family: {
    type: Schema.Types.ObjectId,
    ref: 'Family',
  },
});

module.exports = mongoose.model('Conversation', conversationSchema);
