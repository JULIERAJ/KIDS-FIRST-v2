const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const principleSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: false,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    required: true,
    //check that it is unique, without duplication
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  emailIsActivated: {
    type: Boolean,
    default: false,
  },
});

principleSchema.pre('save', async function (next) {
  const principle = this;
  // only hash the password if it has been modified (or is new)
  // SALT_WORK_FACTOR = 8, auto-gen a salt and hash
  if (principle.isModified('password')) {
    principle.password = await bcrypt.hash(principle.password, 8);
  }
  next();
});

// Apply the uniqueValidator plugin to principleSchema.
principleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Principle', principleSchema);
