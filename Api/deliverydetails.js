const express = require('express');
const router = express.Router();
const Delivery =require('../models/Delivery')
router.post('/save', async (req, res) => {
    try {
      // Create a new delivery instance using the request body
      const newDelivery = new Delivery(req.body);
      // Save the delivery details to the database
      await newDelivery.save();
      console.log(req.body);
      res.status(201).json({ message: 'Delivery details saved successfully' });
    } catch (error) {
      console.error('Error saving delivery details:', error);
      res.status(500).json({ error: 'An error occurred while saving delivery details' });
    }
  });
  
  module.exports = router;

