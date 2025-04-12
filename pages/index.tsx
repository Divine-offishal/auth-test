"use client";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import TelegramAuth from "./(components)/TelegramAuth";
import Script from "next/script";
import ConnectWallet from "./(components)/ConnectWallet";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <TonConnectUIProvider manifestUrl="https://auth-test-ashen.vercel.app/tonconnect-manifest.json">
      <main>
        <ConnectWallet />
        <TelegramAuth />
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </main>
    </TonConnectUIProvider>
  );
}
