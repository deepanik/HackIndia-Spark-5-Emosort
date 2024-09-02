const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes'); // Make sure this path is correct

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Register routes
app.use('/api', fileRoutes); // This prefix should match the API calls you're making

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
