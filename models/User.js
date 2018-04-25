const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  gender: {type:String,default:'Null'},
  allergies: {type:String,default:'Null'},
  diet: {type:String,default:'Null'},
  age: Number,
  height: Number,
  weight: Number,
  recipes:Array
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
