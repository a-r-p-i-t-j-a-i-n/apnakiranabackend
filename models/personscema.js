const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  mobile: Number,
  email:{
    type:String,
    unique:true,
    required:true
   },
  password:String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
