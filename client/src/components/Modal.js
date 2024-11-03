import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;

    if (!address) {
      alert("Please enter a valid address.");
      return;
    }

    try {
      const tx = await contract.allow(address); // Call your smart contract method
      await tx.wait(); // Wait for the transaction to be mined
      alert("Access shared successfully!");
      setModalOpen(false); // Close modal after successful transaction
    } catch (error) {
      console.error("Error sharing access:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  useEffect(() => {
    const accessList = async () => {
      if (!contract) return; // Ensure contract is loaded

      try {
        const addressList = await contract.shareAccess();
        let select = document.querySelector("#selectNumber");
        select.innerHTML = ""; // Clear previous options

        addressList.forEach((opt) => {
          let e1 = document.createElement("option");
          e1.textContent = opt;
          e1.value = opt;
          select.appendChild(e1);
        });
      } catch (error) {
        console.error("Error fetching access list:", error);
      }
    };

    accessList();
  }, [contract]);

  return (
    <>
      <div 
        className="modalBackground" 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div 
          className="modalContainer" 
          style={{
            background: "linear-gradient(135deg, #6a82fb, #fc5c7d)",
            borderRadius: "8px",
            padding: "20px",
            color: "#fff",
            width: "300px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                marginBottom: "10px",
              }}
            />
          </div>
          <form id="myForm">
            <select id="selectNumber" style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "none", backgroundColor: "#fff", color: "#000" }}>
              <option value="" disabled selected>
                People With Access
              </option>
            </select>
          </form>
          <div className="footer" style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#fff",
                color: "#000",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f0f0f0"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#fff"}
            >
              Cancel
            </button>
            <button 
              onClick={sharing} 
              style={{
                padding: "10px 20px",
                borderRadius: "5px",
                backgroundColor: "#ff7f50",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#ff6347"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ff7f50"}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
