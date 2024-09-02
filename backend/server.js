const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());


// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// File Routes
app.use('/api', fileRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
