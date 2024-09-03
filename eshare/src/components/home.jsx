
import React from 'react';
import { Link } from 'react-router-dom';
import { FiUpload, FiHome, FiDownload, FiInfo, FiDollarSign } from 'react-icons/fi';


//
import BackgroundEffect from '../components/BackgroundEffect';

const home = () => {
  return (
    
    <div className="bg-white text-gray-900 min-h-screen flex flex-col items-center justify-center">
           

      <div className="text-center mb-12 p-6">
      <header className="w-full p-4 text-neonPink text-center text-2xl">
                    Welcome to Encrypted Share
                </header>
        <p className="text-lg mb-6">
          EncryptShare is your secure platform for sharing files with ease. Upload your files, set a price, and receive a unique code to share. Your recipients will need to pay to access the file, ensuring both security and monetization for your valuable data.
        </p>
        <Link to="/upload">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Upload Your Files</h2>
          <p className="mb-4">
            Easily upload your files and set a price. Each file will get a unique code for secure sharing.
          </p>
          <Link to="/upload" className="text-blue-500 hover:underline">
            <FiUpload size={24} /> Upload Now
          </Link>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Download Files</h2>
          <p className="mb-4">
            Receive a unique code to download files. Pay the set amount to access the files securely.
          </p>
          <Link to="/download" className="text-blue-500 hover:underline">
            <FiDownload size={24} /> Download Now
          </Link>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Track Transactions</h2>
          <p className="mb-4">
            Keep track of all your transactions with our easy-to-use interface.
          </p>
          <Link to="/transaction" className="text-blue-500 hover:underline">
            <FiDollarSign size={24} /> View Transactions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default home;
