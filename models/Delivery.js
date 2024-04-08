const mongoose = require('mongoose');

// Define the delivery schema
const deliverySchema = new mongoose.Schema({
  firstName: {
    type:String,
   required:true,
  },
  mobileNumber: {
    type:String,
   required:true,
  },
  pincode: String,
  state: String,
  address: String,
  city: String,
  landmark: String,
  addressType: String,
});

// Create the delivery model
const Delivery = mongoose.model('Delivery', deliverySchema);
module.exports = Delivery;
