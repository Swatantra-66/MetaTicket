import React from "react";
import { ethers } from "ethers";
import Marketplace from "../contracts/Marketplace";

function BuyTicketForm({ ticket }) {
  async function handleBuy() {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );

    try {
      const tx = await contract.buyTicket(ticket.id, {
        value: ticket.price,
      });
      await tx.wait();
      alert("Ticket purchased successfully!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed!");
    }
  }

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-xl">
      <h3 className="text-lg font-semibold mb-2">Buy Ticket</h3>
      <p>Ticket ID: {ticket.id}</p>
      <p>Price: {ethers.formatEther(ticket.price)} ETH</p>
      <button
        onClick={handleBuy}
        className="mt-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl"
      >
        Confirm Purchase
      </button>
    </div>
  );
}

export default BuyTicketForm;
