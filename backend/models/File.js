const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  size: { type: Number, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  author: { type: String, required: true },
  account: { type: String, required: true },
  encryptionCode: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  encryptionCode: String,
});

module.exports = mongoose.model('File', FileSchema);
