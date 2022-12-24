const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

const familySchema = new Schema (
  {
    principle: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Principle' }]
    },
    
    familyName: {
      type: String, 
      required: true 
    }, 
    createdAt: {
      type: Date, 
      default: Date.now(),
      immutable: true
    },
    updatedAt: {
      type: Date, 
      default: Date.now()
    }
  }
);

module.exports = mongoose.model('Family', familySchema);

//import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const blogSchema = new Schema({
//   title:  String, // String is shorthand for {type: String}
//   author: String,
//   body:   String,
//   comments: [{ body: String, date: Date }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean,
//   meta: {
//     votes: Number,
//     favs:  Number
//   }
// });
