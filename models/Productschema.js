// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
 
  productId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url:{
    type:String,
    
  },
  // You can add more fields as needed
  // Example: category, imageURL, quantity, etc.
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
