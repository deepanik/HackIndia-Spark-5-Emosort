const Web3 = require('web3'); // Import Web3
const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const crypto = require('crypto');
require('dotenv').config();

const router = express.Router();


// Get files
app.get('/api/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Request encryption code
app.post('/api/encryption-code', async (req, res) => {
  const { fileId } = req.body;

  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required.' });
  }

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found.' });
    }

    const encryptionCode = generateEncryptionCode();
    file.encryptionCode = encryptionCode;
    await file.save();

    res.json({ encryptionCode });
  } catch (error) {
    console.error('Error generating encryption code:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// Initialize Web3 with an HTTP provider
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for uploading a file
router.post('/upload', upload.single('file'), async (req, res) => {
  const { fileName, price, description, author, account } = req.body;

  const encryptionCode = crypto.randomBytes(8).toString('hex');
  const newFile = new File({
    fileName,
    size: req.file.size,
    description,
    price,
    author,
    account,
    encryptionCode,
    filePath: req.file.path,
  });

  try {
    const file = await newFile.save();
    res.json(file);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Route for getting all files
router.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching files' });
  }
});

// Route for buying a file
router.post('/buy/:fileId', async (req, res) => {
  const { account } = req.body;
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found' });

    // Payment processing logic here
    // For now, we'll assume the payment is successful
    const paymentSuccess = true; // Simulate payment success

    if (paymentSuccess) {
      res.json({ encryptionCode: file.encryptionCode });
    } else {
      res.status(400).json({ error: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment' });
  }
});

// Route for downloading a file using encryption code
router.post('/download', async (req, res) => {
  const { encryptionCode } = req.body;

  try {
    const file = await File.findOne({ encryptionCode });
    if (!file) return res.status(404).json({ error: 'Invalid encryption code' });

    res.download(file.filePath);
  } catch (error) {
    res.status(500).json({ error: 'Error downloading file' });
  }
});

// Route for retrieving encryption codes
router.get('/retrieve/:account', async (req, res) => {
  const { account } = req.params;

  try {
    const files = await File.find({ account });
    res.json(files.map(file => ({ fileName: file.fileName, encryptionCode: file.encryptionCode })));
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving encryption codes' });
  }
});

module.exports = router;
