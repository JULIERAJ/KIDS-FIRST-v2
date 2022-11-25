const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const principleSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        requried: true,
    },
    // firstname??????
    // lastname????????
    // isAdmin: {
    //   type: Boolean,
    //   required: true
    // }

    createdAt: {
        type: Date,
        default: Date.now(),
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
});

module.exports = mongoose.model("Principle", principleSchema);
