const express = require('express');
const app = express();
const port = 5000;  
const cors = require('cors');
const bodyParser = require('body-parser');
const personinformation=require('./Api/personinformation');
const product=require('./Api/product')
const deliverydetails=require('./Api/deliverydetails')
// const connectdb=require('./db');
const connectToMongo = require('./db');
connectToMongo()
app.use(cors());
app.use(bodyParser.json());
// Define a route
app.use('/api/person',personinformation);
app.use('/api/product',product)
app.use('/api/delivery',deliverydetails);
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
