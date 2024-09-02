import React, { useState } from 'react';
import Web3 from 'web3';
import axios from 'axios';
import { useMetaMask } from '../hooks/useMetaMask';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');
  
  const { isConnected, account, connect, disconnect } = useMetaMask();

  const handleFileUpload = async () => {
    if (!isConnected) {
      alert('Please connect MetaMask first.');
      return;
    }
    
    if (!file || !fileName || !price || !description || !author) {
      alert('All fields are required.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // Check file size (5 MB limit)
      alert('File size should not exceed 5 MB.');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG, PNG, and PDF files are allowed.');
      return;
    }

    const web3 = new Web3(Web3.givenProvider);

    // Convert price to Wei (assuming you are using Ether)
    const priceInWei = web3.utils.toWei(price, 'ether');

    // Hardcoded contract address
    const contractAddress = '0x1564FfA1Ccb8427D7dFd6e5DD27AA92C13dcA161'; 

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('account', account);

    try {
      setLoading(true);

      // Estimate gas
      const gasEstimate = await web3.eth.estimateGas({
        from: account,
        to: contractAddress,
        value: priceInWei,
      });

      // First, send a transaction to pay the fee
      const tx = await web3.eth.sendTransaction({
        from: account,
        to: contractAddress,
        value: priceInWei,
        gas: gasEstimate,
      });

      setTransactionHash(tx.transactionHash);
      
      // Show transaction status
      console.log('Transaction successful:', tx.transactionHash);

      // Proceed to upload the file
      const uploadResponse = await axios.post('http://localhost:3001/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        }
      });

      console.log('File uploaded successfully', uploadResponse.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file or processing payment', error);
      setError(`An error occurred: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="File Name" />
      <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (ETH)" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
      <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name" />
      <button onClick={handleFileUpload} className="bg-green-500 text-white p-2 rounded" disabled={loading}>
        {loading ? `Uploading... ${uploadProgress}%` : 'Upload File'}
      </button>
      {!isConnected && <button onClick={connect} className="bg-blue-500 text-white p-2 rounded">Connect MetaMask</button>}
      {isConnected && <button onClick={disconnect} className="bg-red-500 text-white p-2 rounded">Disconnect MetaMask</button>}
      {transactionHash && <p>Transaction Hash: <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">{transactionHash}</a></p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default UploadFile;
