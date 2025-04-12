"use client";
import React, { useEffect, useState } from "react";
import {
  useTonConnectUI,
  Wallet,
  WalletInfoRemote,
} from "@tonconnect/ui-react";
import { getTonConnect } from "@/lib/tonConnect";
import Head from "next/head";

export default function ConnectWallet() {
  const [tonConnectUI] = useTonConnectUI();
  const [walletInfo, setWalletInfo] = useState<any>(null);

  useEffect(() => {
    const tonConnect = getTonConnect();
    if (!tonConnect) return;

    tonConnect.restoreConnection();

    tonConnect.onStatusChange((wallet: Wallet | null) => {
      if (wallet) {
        setWalletInfo(wallet);
        console.log("Wallet connected:", wallet);
      } else {
        setWalletInfo(null);
      }
    });
  }, []);

  const handleConnect = () => {
    tonConnectUI.openModal(); // triggers the wallet selection modal
  };

  return (
    <>
      <Head>
        <link rel="tonconnect-manifest" href="/tonconnect-manifest.json" />
      </Head>
      <div>
        <button
          onClick={handleConnect}
          className="px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition"
        >
          Connect TON Wallet
        </button>

        {walletInfo && (
          <div className="mt-4">
            <p>
              <strong>Address:</strong> {walletInfo.account.address}
            </p>
            <p>
              <strong>Network:</strong> {walletInfo.account.chain}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
