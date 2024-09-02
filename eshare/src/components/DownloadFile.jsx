import React, { useState } from 'react';
import axios from 'axios';

const DownloadFile = () => {
  const [encryptionCode, setEncryptionCode] = useState('');

  const handleDownload = async () => {
    try {
      const response = await axios.post('/api/download', { encryptionCode });
      // Handle file download
    } catch (error) {
      console.error('Error downloading file', error);
    }
  };

  return (
    <div className="p-4">
      <input type="text" value={encryptionCode} onChange={(e) => setEncryptionCode(e.target.value)} placeholder="Enter Encryption Code" />
      <button onClick={handleDownload} className="bg-green-500 text-white p-2 rounded">Download</button>
    </div>
  );
};

export default DownloadFile;
