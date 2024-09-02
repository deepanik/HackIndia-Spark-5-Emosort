import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import axios from 'axios';

const API_BASE_URL = "http://localhost:3001/";

const Profile = ({ account, author, setAuthor }) => {
  const [uploads, setUploads] = useState([]);
  const [balance, setBalance] = useState(0);
  const [isAuthorSet, setIsAuthorSet] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [purchases, setPurchases] = useState([]); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      setError('Error fetching data: ' + error.message);
      throw error; // Rethrow error to handle it in the calling function
    }
  };

  useEffect(() => {
    if (!account) {
      setError('Invalid account');
      setLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      const web3 = new Web3(window.ethereum);
      
      try {
        const balance = await web3.eth.getBalance(account);
        setBalance(web3.utils.fromWei(balance, 'ether'));

        const accountExists = await axios.get(`${API_BASE_URL}/api/account/${account}`);
        if (accountExists.data.exists) {
          const [uploadsData, purchasesData, authorData] = await Promise.all([
            fetchData(`${API_BASE_URL}/api/uploads/${account}`),
            fetchData(`${API_BASE_URL}/api/purchases/${account}`),
            fetchData(`${API_BASE_URL}/api/author/${account}`)
          ]);

          setUploads(uploadsData);
          setPurchases(purchasesData);
          if (authorData && authorData.author) {
            setAuthor(authorData.author);
            setIsAuthorSet(true);
          } else {
            setIsAuthorSet(false);
          }
        } else {
          await axios.post(`${API_BASE_URL}/api/profile`, { account });
        }
      } catch (error) {
        setError('Error loading profile data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [account, setAuthor]);

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value);
  };

  const handleAddAuthor = async () => {
    if (!isAuthorSet && newAuthor !== '') {
      setLoading(true);
      try {
        await axios.post(`${API_BASE_URL}/api/author/${account}`, { author: newAuthor });
        setAuthor(newAuthor);
        setIsAuthorSet(true);
      } catch (error) {
        setError('Error adding author: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = async (encryptionCode, fileName) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/download/${encryptionCode}/${fileName}`, {
        responseType: 'blob', // Ensure the response is treated as a blob
      });
      if (response.data) {
        const file = new Blob([response.data], { type: response.headers['content-type'] });
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(fileURL); // Clean up the URL object
      } else {
        setError('File not found');
      }
    } catch (error) {
      setError('Error downloading file: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : (
            <div>
              <h2>Profile</h2>
              <p>Account: {account}</p>
              <p>Balance: {balance} ETH</p>
              <p>Author: {author}</p>
              {!isAuthorSet ? (
                <div>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={handleAuthorChange}
                    placeholder="Enter author name"
                    required
                  />
                  <button onClick={handleAddAuthor}>Add Author</button>
                </div>
              ) : (
                <p>Author is set</p>
              )}
              <h2>Uploads</h2>
              <ul>
                {uploads.map((upload, index) => (
                  <li key={index}>
                    <p>{upload.fileName}</p>
                    <button onClick={() => handleDownload(upload.encryptionCode, upload.fileName)}>
                      Download
                    </button>
                  </li>
                ))}
              </ul>
              <h2>Purchases</h2>
              <ul>
                {purchases.map((purchase, index) => (
                  <li key={index}>
                    <p>{purchase.fileName}</p>
                    <button onClick={() => handleDownload(purchase.encryptionCode, purchase.fileName)}>
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
