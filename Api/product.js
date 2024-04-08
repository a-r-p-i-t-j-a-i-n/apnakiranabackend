// routes/productRoutes.js
const mongoose = require('mongoose');
const express = require('express');
const Product = require('../models/Productschema');


const router = express.Router();

// GET a specific product by ID
router.get('/getByName/:productName', async (req, res) => {
  const productName = req.params.productName;

  try {
    // Use findOne to retrieve a single document matching the specified criteria
    const product = await Product.findOne({ name: productName });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/details',async(req,res)=>{
  try {
    const products = await Product.find();
    res.json(products);
} catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
})
router.post('/save', async (req, res) => {
  const { productId,name, price, description,url } = req.body;

  try {
    // Create a new product instance
    const newProduct = new Product({ productId,name, price, description,url });

    // Save the product to the database
    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Assuming your product schema has a unique identifier 'productId'

router.put('/update/:productId', async (req, res) => {
  const { name, price, description,url } = req.body;
  const productId = req.params.productId;

  try {
    // Validate if productId is a valid ObjectId
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ error: 'Invalid Product ID' });
    }

    // Find the product by ObjectId and update
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, price, description,url },
      { new: true } // To return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Delete a product by ID
router.delete('/delete/:productId', async (req, res) => {
  const productId = req.params.productId;

  try {
    // Use the findByIdAndDelete method to delete the product
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
