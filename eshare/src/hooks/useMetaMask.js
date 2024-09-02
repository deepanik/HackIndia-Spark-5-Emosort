// src/hooks/useMetaMask.js
import { useState, useEffect } from 'react';
import Web3 from 'web3';

export const useMetaMask = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState('');

  useEffect(() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      const checkConnection = async () => {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }
      };

      checkConnection();

      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setIsConnected(false);
          setAccount('');
        }
      });

      window.ethereum.on('disconnect', () => {
        setIsConnected(false);
        setAccount('');
      });
    } else {
      console.log('MetaMask is not installed');
    }
  }, []);

  const connect = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      console.log('MetaMask is not installed');
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAccount('');
  };

  return { isConnected, account, connect, disconnect };
};
