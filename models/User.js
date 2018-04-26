require('dotenv').config();
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  gender: String,
  allergies: {type:String,default:'Null'},
  diet: {type:String,default:'Null'},
  age: Number,
  height: Number,
  weight: Number,
  recipes:[{type: Schema.Types.ObjectId, ref:"Recipe"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
