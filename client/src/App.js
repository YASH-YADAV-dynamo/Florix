import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount("");
        setContract(null);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    // Only add listeners if MetaMask is detected
    if (window.ethereum?.isMetaMask) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, []);

  const getMetaMaskProvider = () => {
    // Check if MetaMask is installed
    if (!window.ethereum?.isMetaMask) {
      alert("Please install MetaMask!");
      window.open("https://metamask.io/download/", "_blank");
      return null;
    }

    const providers = window.ethereum.providers || [window.ethereum];
    const metaMaskProvider = providers.find(provider => provider.isMetaMask);

    if (!metaMaskProvider) {
      alert("Please install MetaMask!");
      window.open("https://metamask.io/download/", "_blank");
      return null;
    }

    return metaMaskProvider;
  };

  const connectWallet = async () => {
    try {
      const metaMaskProvider = getMetaMaskProvider();
      if (!metaMaskProvider) return;

      const provider = new ethers.providers.Web3Provider(metaMaskProvider);
      setProvider(provider);

      const accounts = await metaMaskProvider.request({
        method: "eth_requestAccounts"
      });
      
      const signer = provider.getSigner();
      setAccount(accounts[0]);

      const contractAddress = "0x6A66F62d2906410312E59e3ca79ee6DC2706f02C";
      const contract = new ethers.Contract(
        contractAddress,
        Upload.abi,
        signer
      );
      setContract(contract);

    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      if (error.code === 4001) {
        alert("You rejected the connection request.");
      } else {
        alert("Error connecting to MetaMask. Please try again.");
      }
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setContract(null);
    setProvider(null);
  };

  return (
    <div className="App">
      <h1>Floxis - Decentralized File Sharing</h1>
      <p className="intro-text">
        Welcome to Floxis, a revolutionary platform for sharing and uploading files securely on the blockchain.
        Experience the freedom of decentralized storage where your data is in your hands.
      </p>
      <div className="account-info">
        <p>
          {account ? (
            `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
          ) : (
            "Not connected"
          )}
        </p>
        <button onClick={account ? disconnectWallet : connectWallet}>
          {account ? "Disconnect MetaMask" : "Connect MetaMask"}
        </button>
      </div>

      <div className="modal-button">
        {!modalOpen ? (
          <button onClick={() => setModalOpen(true)}>
            Share a File
          </button>
        ) : (
          <Modal setModalOpen={setModalOpen} contract={contract} />
        )}
      </div>

      {account && (
        <div className="file-upload-section">
          <h2>Upload Your Files</h2>
          <p>
            Select a file to upload and share it securely on the blockchain. Your uploaded files will be accessible to others while maintaining your privacy and control.
          </p>
          <FileUpload account={account} provider={provider} contract={contract} />
          <Display contract={contract} account={account} />
        </div>
      )}

      <footer>
        <p>
          Built with ❤️ using AIA blockchain & IPFS for decentralized file storage. 
          Join us in the movement towards a more secure internet!
        </p>
      </footer>
    </div>
  );
}

export default App;
