"use client";

import React from "react";
import { useTonConnectUI, useTonWallet } from "@tonconnect/ui-react";

export default function ConnectWallet() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const handleConnect = () => {
    tonConnectUI.openModal();
  };

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
  };

  return (
    <div>
      {!wallet ? (
        <button
          onClick={handleConnect}
          className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
        >
          Connect TON Wallet
        </button>
      ) : (
        <div className="space-y-3">
          <div>
            <p>
              <strong>Address:</strong> {wallet.account.address}
            </p>
            <p>
              <strong>Network:</strong> {wallet.account.chain}
            </p>
          </div>
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Disconnect Wallet
          </button>
        </div>
      )}
    </div>
  );
}
