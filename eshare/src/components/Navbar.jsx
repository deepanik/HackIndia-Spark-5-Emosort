// import React from 'react';
// import { useMetaMask } from '../hooks/useMetaMask';

// const Navbar = () => {
//   const { isConnected, account, connect, disconnect } = useMetaMask();

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="text-white text-lg font-semibold">
//           <a href="/" className="hover:text-gray-400">eShare</a>
//         </div>
//         <div className="space-x-4">
//           <a href="/upload" className="text-white hover:text-gray-400">Upload</a>
//           <a href="/feed" className="text-white hover:text-gray-400">Feed</a>
//           <a href="/about" className="text-white hover:text-gray-400">About</a>
//           <a href="/transaction" className="text-white hover:text-gray-400">Transcations</a>
//         </div>
//         <div>
//           {!isConnected ? (
//             <button 
//               onClick={connect} 
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Connect MetaMask
//             </button>
//           ) : (
//             <div className="flex items-center space-x-4">
//               <span className="text-white">{account}</span>
//               <button 
//                 onClick={disconnect} 
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Disconnect
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

//2nd


import React, { useState } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { FiUpload, FiHome, FiInfo, FiDollarSign, FiMenu, FiLogIn, FiLogOut } from 'react-icons/fi';
import Img from '../assets/logo.jpg'; // Updated import statement for logo

const Navbar = () => {
  const { isConnected, account, connect, disconnect } = useMetaMask();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 p-4 shadow-lg relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-white text-2xl font-bold flex items-center space-x-2">
          <img src={Img} alt="Logo" className="w-8 h-8" /> {/* Updated logo path */}
          <a href="/" className="hover:text-blue-400">EncryptShare</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white" onClick={toggleMenu}>
          <FiMenu size={24} />
        </button>

        {/* Menu Links */}
        <div className={`lg:flex lg:items-center lg:space-x-8 lg:static absolute left-0 right-0 lg:bg-transparent bg-gray-900 lg:p-0 p-4 transition-transform transform ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'} lg:translate-y-0`}>
          <a href="/upload" className="flex items-center text-white hover:text-blue-400 lg:mt-0 mt-2">
            <FiUpload className="mr-2" /> Upload
          </a>
          <a href="/feed" className="flex items-center text-white hover:text-blue-400 lg:mt-0 mt-2">
            <FiHome className="mr-2" /> Feed
          </a>
          <a href="/download" className="flex items-center text-white hover:text-blue-400 lg:mt-0 mt-2">
            <FiInfo className="mr-2" /> Download
            {/* <Route path="/download" element={<DownloadFile />} /> */}

          </a>
          <a href="/transaction" className="flex items-center text-white hover:text-blue-400 lg:mt-0 mt-2">
            <FiDollarSign className="mr-2" /> Transactions
          </a>

          {/* Optimized MetaMask Button */}
          <div className="mt-2 lg:mt-0 relative">
            {!isConnected ? (
              <button 
                onClick={connect} 
                className="text-white hover:text-blue-400 transition duration-300 flex items-center"
                title="Connect MetaMask"
              >
                <FiLogIn size={24} />
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={disconnect} 
                  className="text-white hover:text-red-400 transition duration-300 flex items-center"
                  title="Disconnect MetaMask"
                >
                  <FiLogOut size={24} />
                </button>
                <span className="text-white">{account}</span> {/* Display account address */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
