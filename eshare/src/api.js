import axios from 'axios';

// Replace with your actual API URL
const API_URL = 'http://localhost:3001/api'; // Example URL, update as needed

// Get all files
export const getFiles = () => {
  return axios.get(`${API_URL}/files`);
};

// Upload a file
export const uploadFile = (formData) => {
  return axios.post(`${API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Buy a file
export const buyFile = (fileId, account) => {
  return axios.post(`${API_URL}/api/buy/${fileId}`, { account });
};

// Download a file using encryption code
export const downloadFile = (encryptionCode) => {
  return axios.post(`${API_URL}/api/download`, { encryptionCode }, {
    responseType: 'blob', // Important for file downloads
  });
};

// Retrieve encryption codes
export const retrieveCodes = (account) => {
  return axios.get(`${API_URL}/api/retrieve/${account}`);
};

// Request an encryption code for a file
export const requestEncryptionCode = (fileId) => {
  return axios.post(`${API_URL}/api/encryption-code`, { fileId });
};

// Fetch the latest transactions
export const getLatestTransactions = () => {
  return axios.get(`${API_URL}/transactions`); // Update the endpoint as needed
};
