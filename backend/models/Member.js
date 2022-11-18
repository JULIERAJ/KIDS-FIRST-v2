const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 


const memberSchema = new Schema ({
  family: {
    type: Schema.Types.ObjectId, ref: 'Family', 
    reuiqred: true
  }, 
  principle: {
    type: Schema.Types.ObjectId, ref: 'Principle', 
  }, 
  firstname: {
    type: String, 
    required: true
  },
  lastname: {
    type: String, 
    required: true
  }, 
  // avatar: {
  //   data: Buffer, 
  //   contentType: String 
  // },

  // username?????
  dateOfBirth: {
    type: Date, 
    // required: true, 
    trim: true
  },
  relationship: {
    type: String, 
    // required: true
  }, 
  allergy: [{
    type: String
  }], 
  favoriate: [{
    type: String
  }],
  dislike: [{
    type: String
  }],
  createdAt: {
    type: Date, 
    default: Date.now(), 
    immutable: true
  }, 
  updatedAt: {
    type: Date, 
    default: Date.now()
  }
});

module.exports = mongoose.model('Member', memberSchema); 
