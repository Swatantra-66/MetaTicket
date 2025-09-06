import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Marketplace from "../contracts/Marketplace";

function TicketList({ onSelectTicket }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    async function loadTickets() {
      if (!window.ethereum) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        provider
      );

      try {
        const listings = await contract.getAllListings();
        setTickets(listings);
      } catch (e) {
        console.error("Error loading tickets:", e);
      }
    }
    loadTickets();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Available Tickets</h2>
      {tickets.length === 0 && <p>No tickets listed yet.</p>}
      <ul className="space-y-3">
        {tickets.map((ticket, i) => (
          <li
            key={i}
            className="bg-gray-700 p-3 rounded-xl hover:bg-gray-600 cursor-pointer"
            onClick={() => onSelectTicket({ id: i, ...ticket })}
          >
            <p>🎟 Ticket ID: {i}</p>
            <p>Price: {ethers.formatEther(ticket.price)} ETH</p>
            <p>Seller: {ticket.seller}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TicketList;
