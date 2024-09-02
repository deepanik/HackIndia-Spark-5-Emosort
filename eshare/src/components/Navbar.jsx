import React from 'react';
import { useMetaMask } from '../hooks/useMetaMask';

const Navbar = () => {
  const { isConnected, account, connect, disconnect } = useMetaMask();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <a href="/" className="hover:text-gray-400">eShare</a>
        </div>
        <div className="space-x-4">
          <a href="/upload" className="text-white hover:text-gray-400">Upload</a>
          <a href="/feed" className="text-white hover:text-gray-400">Feed</a>
          <a href="/about" className="text-white hover:text-gray-400">About</a>
          <a href="/transaction" className="text-white hover:text-gray-400">Transcations</a>
        </div>
        <div>
          {!isConnected ? (
            <button 
              onClick={connect} 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Connect MetaMask
            </button>
          ) : (
            <div className="flex items-center space-x-4">
              <span className="text-white">{account}</span>
              <button 
                onClick={disconnect} 
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
