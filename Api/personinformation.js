const express = require('express');
const Person = require('../models/personscema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
var authenticateToken=require('../middleware/fetchuser');
const Admin = require('../models/Adminschema');
const nodemailer=require('nodemailer')
const crypto =require('crypto')
var jwtsecret="arpit@123"
// Create a new person
router.post('/ragister', async (req, res) => {
  try {
    const { name, mobile,email,password } = req.body;
    const existingUser = await Person.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPerson = new Person({ name, mobile,email,password:hashedPassword });
    const savedPerson = await newPerson.save();
    res.json(savedPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await Person.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      // Compare the provided password with the stored password
      const token = jwt.sign({ userId: user._id }, jwtsecret)

    res.json({ token });
  
      // res.json({ message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  router.post('/getuser', authenticateToken, async (req, res) => {
    try {
     
  
      const userId = req.user;
      const user = await Person.findById(userId).select("-password");
      // if (!user) {
      //   return res.status(404).json({ error: 'User not found' });
      // }
  
      res.json(user);
      console.log(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
//create forget password
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Person.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a unique reset text
    const resetText = generateRandomText();

    // Set reset text and expiration in the user document
    user.resetPasswordText = resetText;
    user.resetPasswordExpires = Date.now() + 3600000; // Text expires in 1 hour

    await user.save();

    // Send email with the reset text
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'arpitjian25@gmail.com',
        pass: 'lysv bmxa rlty giyz',
      },
    });

    const mailOptions = {
      from: 'arpitjian25@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Use the following text to reset your password:\n\n
        ${resetText}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Reset email sent. Please check your email.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

function generateRandomText() {
  // Logic to generate a random text (e.g., alphanumeric characters)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const textLength = 4; // You can adjust the length as needed
  let randomText = '';
  for (let i = 0; i < textLength; i++) {
    randomText += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomText;
}
//varifying mail text
// Add this route to your backend API
// Add this route to your backend API
router.post('/verify-reset-text', async (req, res) => {
  try {
    const { email, resetText } = req.body;

    const user = await Person.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Debugging: Log the stored reset text and the entered reset text
    console.log('Stored Reset Text:', user.resetPasswordText);
    console.log('Entered Reset Text:', resetText);
    console.log('Request Headers:', req.headers);
    console.log('Provided Email:', email);
    console.log('Provided Reset Text:', resetText);
    // Check if the entered reset text matches the stored reset text
    if (user.resetPasswordText !== resetText.trim()) {
      return res.status(401).json({ error: 'Invalid reset text' });
    }

    // Check if the reset text has expired
    if (Date.now() > user.resetPasswordExpires) {
      return res.status(401).json({ error: 'Reset text has expired' });
    }

    // Reset the user's password (you need to implement this part)
    // Example: user.password = newPassword; await user.save();

    // Clear the reset text and expiration in the user document
    user.resetPasswordText = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});



  router.post('/admin', async (req, res) => {
    try {
      const { name, PanNumber, mobile, email, password } = req.body;
  
      // Check if the user already exists
      const existingUser = await Admin.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new admin user
      const newPerson = new Admin({
        name,
        PanNumber,
        mobile,
        email,
        password: hashedPassword,
      });
  
      // Save the new admin user to the database
      const savedPerson = await newPerson.save();
  
      res.json(savedPerson);
    } catch (error) {
      console.error('Error creating admin:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.post('/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Compare the provided password with the admin's hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Create and send a JWT token upon successful login
      const token = jwt.sign({ adminId: admin._id }, jwtsecret);
  
      res.json({ token });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
module.exports = router;
