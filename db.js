const mongoose = require('mongoose');

// Connect to MongoDB Atlas
async function connectToMongo() {
  try {
    await mongoose.connect('mongodb+srv://arpitjian25:cyZNWNVEPtuE7uKS@apnakirana.as0bmbm.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
  }
}

module.exports = connectToMongo;
