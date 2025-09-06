import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import TicketList from "./components/TicketList";
import BuyTicketForm from "./components/BuyTicketForm";

function App() {
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">🎟️ Ticket Marketplace</h1>
        <TicketList onSelectTicket={setSelectedTicket} />
        {selectedTicket && <BuyTicketForm ticket={selectedTicket} />}
      </main>
    </div>
  );
}

export default App;
