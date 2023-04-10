const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
  inviter: { type: Schema.Types.ObjectId, ref: 'Principle' },
  family: { type: Schema.Types.ObjectId, ref:'Family' },
  inviteeEmail: {
    type: String,
    required: true,
  },
  invitationUrl: {
    type: String, 
    // required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  invitationAccepted: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Invitation', invitationSchema);
