import axios from 'axios';

const API_URL = 'http://localhost:3001/api/files'; // Update with your actual API URL

// Get all files
export const getFiles = () => {
  return axios.get(`${API_URL}`);
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
  return axios.post(`${API_URL}/buy/${fileId}`, { account });
};

// Download a file using encryption code
export const downloadFile = (encryptionCode) => {
  return axios.post(`${API_URL}/download`, { encryptionCode }, {
    responseType: 'blob', // Important for file downloads
  });
};

// Retrieve encryption codes
export const retrieveCodes = (account) => {
  return axios.get(`${API_URL}/retrieve/${account}`);
};

export const requestEncryptionCode = (fileId) => {
  return axios.post(`${API_URL}/api/encryption-code`, { fileId });
};