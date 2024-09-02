require('dotenv').config();
const mongoose = require('mongoose');
const File = require('./models/File');
const Transaction = require('./models/Transaction'); // Path to your Transaction model

async function seedDatabase() {
  try {
    // Check if MONGO_URI is available
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set.');
    }

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create some sample files and transactions
    const file1 = new File({
      fileName: 'sampleFile1.txt',
      size: 1234,
      description: 'Sample file 1',
      price: 0.1,
      author: 'Author1',
      account: '0x1234567890abcdef1234567890abcdef12345678',
      encryptionCode: 'abc123',
      filePath: '/path/to/file1',
      uploadDate: new Date(),
      transactionHash: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
      downloadUrl: 'http://example.com/download/file1'
    });

    await file1.save();

    const transaction = new Transaction({
      fileId: file1._id,
      account: '0xabcdefabcdefabcdefabcdefabcdefabcdef12345678',
      transactionHash: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
      price: 0.1
    });

    await transaction.save();

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
