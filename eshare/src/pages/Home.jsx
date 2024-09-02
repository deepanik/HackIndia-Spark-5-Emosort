import React from 'react';
import { Link } from 'react-router-dom';
import ConnectMetaMask from '../components/ConnectMetaMask';

const Home = ({ account, setAccount }) => {
  return (
    <div className="p-4">
      <ConnectMetaMask onConnect={setAccount} />
      {account && (
        <div>
          <Link to="/upload" className="block mt-4 bg-green-500 text-white p-2 rounded">Upload File</Link>
          <Link to="/feed" className="block mt-4 bg-blue-500 text-white p-2 rounded">View Feed</Link>
          <Link to="/download" className="block mt-4 bg-purple-500 text-white p-2 rounded">Download File</Link>
          <Link to="/retrieve" className="block mt-4 bg-yellow-500 text-white p-2 rounded">Retrieve Encryption Code</Link>
        </div>
      )}
    </div>
  );
};

export default Home;
