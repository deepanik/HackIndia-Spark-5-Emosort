import React, { useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import { useMetaMask } from '../hooks/useMetaMask';

// Set up Web3 instance
const web3 = new Web3(Web3.givenProvider);

// Constants
const TRANSACTION_FEE_IN_USD = 0.01;
// const GAS_LIMIT = 40000;

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [binanceId, setBinanceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [transactionHash, setTransactionHash] = useState('');
  const [error, setError] = useState('');

  const { isConnected, account, connect } = useMetaMask();

  const handlePayment = async () => {
    if (!isConnected) {
      throw new Error('MetaMask is not connected.');
    }
  
    const feeInWei = web3.utils.toWei(String(TRANSACTION_FEE_IN_USD), 'ether');
    
    try {
      // Estimate gas for the transaction
      const gasEstimate = await web3.eth.estimateGas({
        from: account,
        to: '0x1564FfA1Ccb8427D7dFd6e5DD27AA92C13dcA161', // Replace with your payment address
        value: feeInWei,
      });
  
      const tx = await web3.eth.sendTransaction({
        from: account,
        to: '0x37E551eD0C989FE65d08651DB7181a938Be0A613',
        value: feeInWei,
        gas: gasEstimate, // Use estimated gas
      });
  
      setTransactionHash(tx.transactionHash);
      return tx.transactionHash;
    } catch (error) {
      throw new Error(`Payment error: ${error.message}`);
    }
  };
  

  const handleFileUpload = async (transactionHash) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('author', author);
    formData.append('binanceId', binanceId);

    try {
      const uploadResponse = await axios.post('http://localhost:3001/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      return uploadResponse.data;
    } catch (error) {
      throw new Error(`File upload error: ${error.message}`);
    }
  };

  const handlePaymentAndUpload = async () => {
    if (!isConnected) {
      alert('Please connect MetaMask first.');
      return;
    }

    if (!file || !fileName || !price || !description || !author || !binanceId) {
      alert('All fields are required.');
      return;
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      alert('Price should be a positive number.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const txHash = await handlePayment();
      console.log('Payment successful:', txHash);

      const uploadResponse = await handleFileUpload(txHash);
      console.log('File and metadata uploaded successfully:', uploadResponse);

      alert('File and metadata uploaded successfully!');
      setTransactionHash('');
      setUploadProgress(0);
    } catch (error) {
      setError(error.message);
      console.error('Error during payment or file upload:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Upload and Pay Fee</h2>
      <button
        onClick={connect}
        className="w-full py-2 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        {isConnected ? `Connected: ${account}` : 'Connect MetaMask'}
      </button>
      <div className="space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="File Name"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price (ETH)"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author Name"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={binanceId}
          onChange={(e) => setBinanceId(e.target.value)}
          placeholder="Binance ID"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handlePaymentAndUpload}
          className={`w-full py-2 px-4 text-white rounded-md transition-colors ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          disabled={loading}
        >
          {loading ? `Uploading... ${uploadProgress}%` : 'Upload and Pay Fee'}
        </button>
      </div>
      {transactionHash && 
        <p className="text-green-600 mt-4">
          Transaction Hash: <a href={`https://etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">{transactionHash}</a>
        </p>}
      {error && 
        <p className="text-red-600 mt-4">
          {error}
        </p>}
    </div>
  );
};

export default UploadFile;
