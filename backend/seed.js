const mongoose = require('mongoose');
const File = require('./models/File'); // Adjust the path if necessary

const MONGO_URI = 'mongodb+srv://xx:xx@cluster0.o8emf.mongodb.net/'; // Replace with your MongoDB connection string

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    
    // Remove existing files
    await File.deleteMany({});

    // Create dummy files
    const files = [
      {
        filePath: 'path/to/file1.pdf',
        fileName: 'File1.pdf',
        description: 'Description for File1',
        price: 0.1,
        author: 'Author1',
        size: '1MB',
        downloadUrl: 'http://example.com/file1.pdf',
        account: '0xYourAccountAddress1',
      },
      {
        filePath: 'path/to/file2.jpeg',
        fileName: 'File2.jpeg',
        description: 'Description for File2',
        price: 0.2,
        author: 'Author2',
        size: '2MB',
        downloadUrl: 'http://example.com/file2.jpeg',
        account: '0xYourAccountAddress2',
      },
      {
        filePath: 'path/to/file3.png',
        fileName: 'File3.png',
        description: 'Description for File3',
        price: 0.15,
        author: 'Author3',
        size: '1.5MB',
        downloadUrl: 'http://example.com/file3.png',
        account: '0xYourAccountAddress3',
      },
    ];

    await File.insertMany(files);
    console.log('Dummy data inserted');
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });
