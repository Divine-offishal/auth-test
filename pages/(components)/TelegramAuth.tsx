"use client"; // Required for Next.js App Directory

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram?: any;
  }
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
}

export default function TelegramAuth() {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [authToken, setAuthToken] = useState<string>("");
  const [isTelegramEnv, setIsTelegramEnv] = useState<boolean>(false);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (tg) {
      setIsTelegramEnv(true);
      tg.ready(); // Signals Telegram Mini App is ready
      setIsReady(true);

      const initData = tg.initData;
      const userData = tg.initDataUnsafe?.user;

      if (userData) {
        setUser(userData);
        setAuthToken(initData);
      }
    } else {
      console.warn("Telegram WebApp not detected.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Telegram Auth Info
        </h2>

        <div className="mb-4">
          <p>
            <strong>Telegram Environment:</strong>{" "}
            <span className={isTelegramEnv ? "text-green-400" : "text-red-400"}>
              {isTelegramEnv ? "Detected ✅" : "Not Detected ❌"}
            </span>
          </p>
          <p>
            <strong>WebApp Ready:</strong>{" "}
            <span className={isReady ? "text-green-400" : "text-yellow-400"}>
              {isReady ? "Ready ✅" : "Waiting... ⏳"}
            </span>
          </p>
        </div>

        {user ? (
          <div className="space-y-3">
            <p>
              <strong>Name:</strong> {user.first_name} {user.last_name ?? ""}
            </p>
            {user.username && (
              <p>
                <strong>Username:</strong> @{user.username}
              </p>
            )}
            {user.photo_url && (
              <img
                src={user.photo_url}
                alt="User Avatar"
                className="w-24 h-24 object-cover rounded-full border border-gray-600"
              />
            )}
            <p>
              <strong>Telegram ID:</strong> {user.id}
            </p>
            <p>
              <strong>Language:</strong> {user.language_code}
            </p>
            <div className="break-all text-sm bg-gray-700 p-2 rounded">
              <strong>Auth Token (initData):</strong>
              <br /> {authToken}
            </div>
          </div>
        ) : (
          <p className="text-yellow-400 text-center">
            {isTelegramEnv
              ? "Fetching Telegram user data..."
              : "Not running inside Telegram."}
          </p>
        )}
      </div>
    </div>
  );
}
