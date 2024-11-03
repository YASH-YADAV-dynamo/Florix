# Decentralized File Sharing Platform-(Floxis)

## Overview

This project is a decentralized file-sharing platform that allows users to upload images to IPFS (InterPlanetary File System) and share them securely with specific wallet addresses on the AIA testnet blockchain. Utilizing blockchain technology ensures that your shared files are tamper-proof and accessible only to designated recipients.

## Features

- Upload images to IPFS.
- Share files using wallet addresses on the AIA testnet.
- Decentralized and secure file storage.
- User-friendly interface for easy file management.

## Technologies Used

- **IPFS**: For decentralized file storage.
- **AIA Testnet**: For secure transactions and wallet management.
- **React.js**: Frontend framework for building the user interface.
- **Node.js**: Backend server to handle requests and interactions with IPFS and the blockchain.

## Architecture

- ![alt text](image.png)

## Getting Started

Follow the steps below to set up the project locally.

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file  in the root directory of the project and add your configuration variables. Use the following template:

   ```dotenv
   # .env template

   AIA_RPC_URL=" "   
   PRIVATE_KEY=" "    
   REACT_APP_PINATA_API_KEY=" "
   REACT_APP_PINATA_SECRET_API_KEY=" "

   ```

4. Start the development server:

   ```bash
   npm run start

   ```

5. Open your browser and navigate to `http://localhost:3000` to access the application.

## Usage

1. Upload an image using the provided interface.
2. Enter the wallet address of the recipient to share the image.
3. Click the "Share" button to send the image link to the specified wallet.

## Contributing

Contributions are welcome! If you have suggestions for improvements or find bugs, please open an issue or submit a pull request.