import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import UploadFile from './components/UploadFile';
import Feed from './components/Feed';
import DownloadFile from './components/DownloadFile';
import RetrieveEncryptionCode from './components/RetrieveEncryptionCode';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Transaction from './components/Transaction';
import { getFiles } from './api';

const App = () => {
  const [files, setFiles] = useState([]);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await getFiles();
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);
        navigate('/home'); 
      } catch (error) {
        console.error('MetaMask connection failed:', error);
      }
    } else {
      alert('MetaMask not detected. Please install MetaMask extension.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/feed" element={<Feed files={files} />} />
          <Route path="/upload" element={<UploadFile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/download" element={<DownloadFile />} />
          <Route path="/retrieve" element={<RetrieveEncryptionCode />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </div>
    </div>
  );
};

// Main entry point with Router
const Main = () => (
  <Router>
    <App />
  </Router>
);

export default Main;
