const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const File = require('../models/File');
const Transaction = require('../models/Transaction');
const Web3 = require('web3');
require('dotenv').config();

const router = express.Router();

// Initialize Web3 with an HTTP provider
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for getting all files
router.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Route for getting all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Route for requesting an encryption code
router.post('/encryption-code', async (req, res) => {
  const { fileId } = req.body;

  if (!fileId) {
    return res.status(400).json({ error: 'File ID is required.' });
  }

  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found.' });

    const encryptionCode = generateEncryptionCode();
    file.encryptionCode = encryptionCode;
    await file.save();

    res.json({ encryptionCode });
  } catch (error) {
    console.error('Error generating encryption code:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Route for uploading a file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { fileName, price, description, author, account, encryptionCode, transactionHash } = req.body;
    const file = req.file;

    if (!file || !fileName || !price || !description || !author || !account || !encryptionCode || !transactionHash) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new file entry
    const newFile = new File({
      fileName,
      size: file.size,
      description,
      price: parseFloat(price),
      author,
      account,
      encryptionCode,
      filePath: file.path,
      transactionHash,
    });

    // Save file information to the database
    const savedFile = await newFile.save();
    res.status(201).json(savedFile);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Error uploading file' });
  }
});

// Route for saving transaction history
router.post('/transaction', async (req, res) => {
  const { fileId, buyer, transactionHash, price } = req.body;

  if (!fileId || !buyer || !transactionHash || !price) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const newTransaction = new Transaction({
      fileId,
      buyer,
      transactionHash,
      price: parseFloat(price),
      date: new Date(),
    });

    const transaction = await newTransaction.save();
    res.json(transaction);
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ error: 'Error saving transaction history.' });
  }
});

// Route for buying a file
router.post('/buy/:fileId', async (req, res) => {
  const { account } = req.body;
  const { fileId } = req.params;

  if (!account || !fileId) {
    return res.status(400).json({ error: 'Account and File ID are required.' });
  }

  try {
    const file = await File.findById(fileId);
    if (!file) return res.status(404).json({ error: 'File not found.' });

    // Simulate payment processing or integrate real payment logic
    const paymentSuccess = true; // Simulate payment success

    if (paymentSuccess) {
      const transactionHash = '0x12345'; // Simulated transaction hash

      await Transaction.create({
        fileId: file._id,
        buyer: account,
        transactionHash,
        price: file.price,
        date: new Date(),
      });

      res.json({ encryptionCode: file.encryptionCode });
    } else {
      res.status(400).json({ error: 'Payment failed.' });
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Error processing payment.' });
  }
});

// Route for downloading a file using encryption code
router.post('/download', async (req, res) => {
  const { encryptionCode } = req.body;

  if (!encryptionCode) {
    return res.status(400).json({ error: 'Encryption code is required.' });
  }

  try {
    const file = await File.findOne({ encryptionCode });
    if (!file) return res.status(404).json({ error: 'Invalid encryption code.' });

    res.download(file.filePath);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Error downloading file.' });
  }
});

// Route for retrieving files and their encryption codes by account
router.get('/retrieve/:account', async (req, res) => {
  const { account } = req.params;

  if (!account) {
    return res.status(400).json({ error: 'Account is required.' });
  }

  try {
    const files = await File.find({ account });
    res.json(files.map(file => ({ fileName: file.fileName, encryptionCode: file.encryptionCode })));
  } catch (error) {
    console.error('Error retrieving encryption codes:', error);
    res.status(500).json({ error: 'Error retrieving encryption codes.' });
  }
});

// Helper function to generate encryption code
const generateEncryptionCode = () => {
  return crypto.randomBytes(8).toString('hex');
};

module.exports = router;
