import React, { useState } from 'react';
import axios from 'axios';

const RetrieveEncryptionCode = ({ account }) => {
  const [files, setFiles] = useState([]);

  const handleRetrieve = async () => {
    try {
      const response = await axios.get(`/api/retrieve/${account}`);
      setFiles(response.data);
    } catch (error) {
      console.error('Error retrieving encryption codes', error);
    }
  };

  return (
    <div className="p-4">
      <button onClick={handleRetrieve} className="bg-blue-500 text-white p-2 rounded">Retrieve Encryption Codes</button>
      <ul>
        {files.map(file => (
          <li key={file._id}>{file.fileName} - Encryption Code: {file.encryptionCode}</li>
        ))}
      </ul>
    </div>
  );
};

export default RetrieveEncryptionCode;
