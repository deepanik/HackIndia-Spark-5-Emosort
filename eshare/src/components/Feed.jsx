import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useMetaMask } from '../hooks/useMetaMask';
import { getFiles, requestEncryptionCode } from '../api'; 
import './Feed.css'; // Import the CSS file for styles

const Feed = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [paymentLoadingFileId, setPaymentLoadingFileId] = useState(null);
  const [encryptionCode, setEncryptionCode] = useState('');

  const { isConnected, account } = useMetaMask();

  const CONTRACT_ADDRESS = '0x1564FfA1Ccb8427D7dFd6e5DD27AA92C13dcA161'; // Replace with your actual contract address

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFiles();
        setFiles(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching files:', error);
        setError('Error fetching files. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handlePayment = async (file) => {
    if (!isConnected) {
      alert('Please connect MetaMask first.');
      return;
    }

    const web3 = new Web3(Web3.givenProvider);
    const priceInWei = web3.utils.toWei(file.price.toString(), 'ether');

    try {
      setPaymentLoadingFileId(file._id);

      // Estimate gas
      const gasEstimate = await web3.eth.estimateGas({
        from: account,
        to: CONTRACT_ADDRESS,
        value: priceInWei,
      });

      // Send payment
      await web3.eth.sendTransaction({
        from: account,
        to: CONTRACT_ADDRESS,
        value: priceInWei,
        gas: gasEstimate,
      });

      // Request encryption code
      const response = await requestEncryptionCode(file._id);
      setEncryptionCode(response.data.encryptionCode);

      // Set the file to be downloaded
      setSelectedFileId(file._id);
      alert('Payment successful! You can now download the file.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again. Error: ' + error.message);
    } finally {
      setPaymentLoadingFileId(null);
    }
  };

  return (
    <div className="feed-container">
      {loading && <p>Loading files...</p>}
      {error && <p className="error-message">{error}</p>}
      {files.length > 0 ? (
        files.map((file) => (
          <div key={file._id} className="file-container">
            <h3 className="file-name">{file.name}</h3>
            <p className="file-description">{file.description}</p>
            <p className="file-details"><strong>Date of Upload:</strong> {new Date(file.uploadDate).toLocaleDateString()}</p>
            <p className="file-details"><strong>Price:</strong> ${file.price}</p>
            <p className="file-details"><strong>Author Name:</strong> {file.authorName}</p>
            <button 
              onClick={() => handlePayment(file)} 
              className="buy-button"
              disabled={paymentLoadingFileId === file._id}
            >
              {paymentLoadingFileId === file._id ? 'Processing Payment...' : 'Buy for $' + file.price}
            </button>
            {selectedFileId === file._id && (
              <div>
                <a href={file.downloadUrl} className="download-link" download>Download</a>
                {encryptionCode && <p>Your Encryption Code: {encryptionCode}</p>}
              </div>
            )}
          </div>
        ))
      ) : (
        !loading && <p>No files available</p>
      )}
    </div>
  );
};

export default Feed;
