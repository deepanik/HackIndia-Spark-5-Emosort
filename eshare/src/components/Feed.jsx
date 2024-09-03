// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import { useMetaMask } from '../hooks/useMetaMask';
// import { getFiles, requestEncryptionCode } from '../api';
// import { Network, Alchemy } from 'alchemy-sdk';

// // Alchemy configuration
// const settings = {
//   apiKey: "kNy2N01QksDGUqachrC4mJnYW_MAdLSS",
//   network: Network.ETH_MAINNET,
// };
// const alchemy = new Alchemy(settings);

// const CONTRACT_ADDRESS = '0x1564FfA1Ccb8427D7dFd6e5DD27AA92C13dcA161'; // Replace with your actual contract address
// const CONTRACT_ABI = [ /* Your contract ABI here */ ];

// const Feed = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [paymentLoadingFileId, setPaymentLoadingFileId] = useState(null);
//   const [encryptionCode, setEncryptionCode] = useState('');

//   const { isConnected, account } = useMetaMask();

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const response = await getFiles();
//         if (response && Array.isArray(response.data)) {
//           setFiles(response.data);
//         } else {
//           setError('Invalid data format');
//         }
//       } catch (error) {
//         console.error('Error fetching files:', error);
//         setError('Error fetching files. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFiles();
//   }, []);

//   const handlePayment = async (file) => {
//     if (!isConnected) {
//       alert('Please connect MetaMask first.');
//       return;
//     }

//     if (!window.ethereum) {
//       alert('MetaMask is not installed. Please install MetaMask.');
//       return;
//     }

//     const web3 = new Web3(window.ethereum);
//     const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
//     const priceInWei = web3.utils.toWei(file.price.toString(), 'ether');

//     try {
//       setPaymentLoadingFileId(file._id);

//       // Request payment from the user
//       await web3.eth.sendTransaction({
//         from: account,
//         to: CONTRACT_ADDRESS,
//         value: priceInWei,
//       });

//       const response = await requestEncryptionCode(file._id);
//       if (response && response.data) {
//         setEncryptionCode(response.data.encryptionCode);
//       } else {
//         setError('Failed to get encryption code');
//       }

//       alert('Payment successful! You can now download the file.');
//     } catch (error) {
//       console.error('Payment failed:', error);
//       alert('Payment failed. Please try again. Error: ' + error.message);
//     } finally {
//       setPaymentLoadingFileId(null);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h2 className="text-3xl font-semibold text-gray-800 mb-6">NFT Feed</h2>
//       {loading && <p>Loading files...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {files.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {files.map((file) => (
//             <div key={file._id} className="relative bg-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-4">
//               <h3 className="text-lg font-semibold text-gray-800">{file.fileName}</h3>
//               <p className="text-gray-600 mt-1">{file.description}</p>
//               <p className="text-gray-500 mt-1">Author: {file.author}</p>
//               <p className="text-indigo-600 mt-1 text-xl font-bold">{file.price} ETH</p>
//               <p className="text-gray-400 mt-1 text-sm">Uploaded on {new Date(file.uploadDate).toLocaleDateString()}</p>
//               <button
//                 onClick={() => handlePayment(file)}
//                 className={`absolute bottom-4 left-4 bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 focus:outline-none ${paymentLoadingFileId === file._id ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 disabled={paymentLoadingFileId === file._id}
//               >
//                 {paymentLoadingFileId === file._id ? 'Processing...' : 'Buy'}
//               </button>
//               {encryptionCode && (
//                 <div className="absolute bottom-4 right-4 text-sm text-green-500">
//                   Encryption Code: {encryptionCode}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         !loading && <p>No files available</p>
//       )}
//     </div>
//   );
// };

// export default Feed;






//2nd



import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useMetaMask } from '../hooks/useMetaMask';
import { getFiles, requestEncryptionCode } from '../api';
import { Network, Alchemy } from 'alchemy-sdk';

// Alchemy configuration
const settings = {
  apiKey: "kNy2N01QksDGUqachrC4mJnYW_MAdLSS",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const CONTRACT_ADDRESS = '0x1564FfA1Ccb8427D7dFd6e5DD27AA92C13dcA161'; // Replace with your actual contract address
const CONTRACT_ABI = [ /* Your contract ABI here */ ];

const Feed = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentLoadingFileId, setPaymentLoadingFileId] = useState(null);
  const [encryptionCode, setEncryptionCode] = useState('');

  const { isConnected, account } = useMetaMask();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFiles();
        if (response && Array.isArray(response.data)) {
          setFiles(response.data);
        } else {
          setError('Invalid data format');
        }
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

    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask.');
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const priceInWei = web3.utils.toWei(file.price.toString(), 'ether');

    try {
      setPaymentLoadingFileId(file._id);

      // Request payment from the user
      await web3.eth.sendTransaction({
        from: account,
        to: CONTRACT_ADDRESS,
        value: priceInWei,
      });

      const response = await requestEncryptionCode(file._id);
      if (response && response.data) {
        setEncryptionCode(response.data.encryptionCode);
      } else {
        setError('Failed to get encryption code');
      }

      alert('Payment successful! You can now download the file.');
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again. Error: ' + error.message);
    } finally {
      setPaymentLoadingFileId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold text-cyan-400 mb-6">NFT Feed</h2>
      {loading && <p className="text-cyan-400">Loading files...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {files.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <div key={file._id} className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <h3 className="text-lg font-semibold text-cyan-300">{file.fileName}</h3>
              <p className="text-gray-400 mt-1">{file.description}</p>
              <p className="text-gray-500 mt-1">Author: {file.author}</p>
              <p className="text-indigo-300 mt-1 text-xl font-bold">{file.price} ETH</p>
              <p className="text-gray-500 mt-1 text-sm">Uploaded on {new Date(file.uploadDate).toLocaleDateString()}</p>
              <button
                onClick={() => handlePayment(file)}
                className={`absolute bottom-4 left-4 bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none ${paymentLoadingFileId === file._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={paymentLoadingFileId === file._id}
              >
                {paymentLoadingFileId === file._id ? 'Processing...' : 'Buy'}
              </button>
              {encryptionCode && (
                <div className="absolute bottom-4 right-4 text-sm text-green-400">
                  Encryption Code: {encryptionCode}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-400">No files available</p>
      )}
    </div>
  );
};

export default Feed;
