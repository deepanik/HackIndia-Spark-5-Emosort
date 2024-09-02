const Web3 = require('web3');
const fs = require('fs');

// Initialize web3 instance
const web3 = new Web3('https://mainnet.infura.io/v3/f7bd1134fde64e8fba4169b73fbae9c2');

// Load the contract ABI
const abi = JSON.parse(fs.readFileSync('./build/contracts/YourContract.json')).abi;

// Access contract instance
const contract = new web3.eth.Contract(abi, '0x1564FfA1Ccb8427D7dFd6e5DD27AA92C13dcA161');

console.log(contract.options.jsonInterface); // This is your ABI
