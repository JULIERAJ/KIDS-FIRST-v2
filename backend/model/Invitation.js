const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
  invitor: { type: Schema.Types.ObjectId, ref: "Member" },
  inviteeEmail: {
    type: String,
    required: true,
  },
  invitationUrl: {
    type: String, 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

module.exports = mongoose.model("Invitation", invitationSchema);
