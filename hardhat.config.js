require('dotenv').config(); 
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.9",
  networks: {
    aia: {
      url: process.env.AIA_RPC_URL,       // Use AIA's RPC URL
      chainId: 1320,                     // Replace with AIA's Chain ID if known
      accounts: [process.env.PRIVATE_KEY] // Load the deployer's private key
    }
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
};
