import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import blockies from "ethereum-blockies-base64";

function Sidebar() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [network, setNetwork] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("MetaMask not found!");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const address = accounts[0];
    setAccount(address);

    const bal = await provider.getBalance(address);
    setBalance(ethers.formatEther(bal));

    const net = await provider.getNetwork();
    setNetwork(net.name);
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => connectWallet());
      window.ethereum.on("chainChanged", () => connectWallet());
    }
  }, []);

  return (
    <aside className="w-80 bg-gray-800 p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Wallet</h2>
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 rounded-xl p-2"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center space-x-3 bg-gray-700 p-3 rounded-xl">
          <img
            src={blockies.create({ seed: account }).toDataURL()}
            alt="identicon"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-mono text-sm">
              {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <p className="text-xs text-gray-300">
              {balance ? `${balance.slice(0, 6)} ETH` : "Loading..."}
            </p>
            <p className="text-xs text-gray-400">{network}</p>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
