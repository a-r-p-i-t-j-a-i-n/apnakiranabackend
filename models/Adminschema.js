const mongoose = require('mongoose');
const AdminSchema=new mongoose.Schema({
    name: String,
    PanNumber:{
        type:String,
        required:true,
    },
    mobile: Number,
    email:{
      type:String,
      unique:true,
      required:true
     },
    password:String,

})
const Admin=mongoose.model('Admin',AdminSchema)
module.exports= Admin;