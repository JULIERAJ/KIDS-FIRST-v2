const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enu = {
  values: ['parent', 'kid'],
  message: '{VALUE} is not supported',
};
const memberSchema = new Schema(
  {
    family: {
      type: Schema.Types.ObjectId,
      ref: 'Family',
      // required: true,
    },
    principle: {
      type: Schema.Types.ObjectId,
      ref: 'Principle',
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      enum: enu,
      trim: true,
    },
  },

  // avatar: {
  //   data: Buffer,
  //   contentType: String
  // },

  // username?????
  // dateOfBirth: {
  //   type: Date,
  //   // required: true,
  //   trim: true,
  // },
  // relationship: {
  //   type: String,
  //   // required: true
  // },
  // allergy: [
  //   {
  //     type: String,
  //   },
  // ],
  // favoriate: [
  //   {
  //     type: String,
  //   },
  // ],
  // dislike: [
  //   {
  //     type: String,
  //   },
  // ],
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  //   immutable: true,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
);

module.exports = mongoose.model('Member', memberSchema);
