import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { getLatestTransactions } from '../api'; // Ensure this import matches your actual export

const web3 = new Web3(); 

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getLatestTransactions(); // Fetch the latest transactions
        setTransactions(response.data); // Ensure you access `response.data`
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Error fetching transactions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-4xl font-bold text-gray-900 mb-8">Latest Transactions</h2>
      {loading && <p className="text-gray-600">Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
                <th className="py-3 px-6 text-left">Transaction Hash</th>
                <th className="py-3 px-6 text-left">From</th>
                <th className="py-3 px-6 text-left">To</th>
                <th className="py-3 px-6 text-center">Value (ETH)</th>
                <th className="py-3 px-6 text-center">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {transactions.map((tx) => (
                <tr key={tx.transactionHash} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    <a
                      href={`https://etherscan.io/tx/${tx.transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                      {tx.transactionHash.substring(0, 10)}...{tx.transactionHash.substring(tx.transactionHash.length - 10)}
                    </a>
                  </td>
                  <td className="py-4 px-6 text-left">{tx.from}</td>
                  <td className="py-4 px-6 text-left">{tx.to}</td>
                  <td className="py-4 px-6 text-center font-medium text-gray-800">
                    {web3.utils.fromWei(tx.value, 'ether')}
                  </td>
                  <td className="py-4 px-6 text-center">{new Date(tx.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-600">No transactions available</p>
      )}
    </div>
  );
};

export default Transaction;
