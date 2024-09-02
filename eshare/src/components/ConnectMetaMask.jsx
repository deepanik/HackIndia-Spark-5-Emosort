import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConnectMetaMask = ({ onConnect }) => {
  const [account, setAccount] = useState('');
  const navigate = useNavigate();

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        onConnect(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('MetaMask not detected');
    }
  };

  return (
    <div className="p-4">
      <button onClick={connectMetaMask} className="bg-blue-500 text-white p-2 rounded">
        {account ? `Connected: ${account}` : 'Connect MetaMask'}
      </button>
    </div>
  );
};

export default ConnectMetaMask;
