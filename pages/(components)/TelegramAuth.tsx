"use client"; // Needed if using Next.js 13+ app directory

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Telegram: any;
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

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();

    const initData = tg?.initData;
    const userData = tg?.initDataUnsafe?.user;

    if (userData) {
      setUser(userData);
      setAuthToken(initData);
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Telegram User Info</h2>
      {user ? (
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user.first_name} {user.last_name}
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
              className="w-24 h-24 object-cover rounded-full"
            />
          )}
          <p>
            <strong>Telegram ID:</strong> {user.id}
          </p>
          <p>
            <strong>Language:</strong> {user.language_code}
          </p>
          <p className="break-all">
            <strong>Auth Token (initData):</strong>
            <br /> {authToken}
          </p>
        </div>
      ) : (
        <p>Loading Telegram user data...</p>
      )}
    </div>
  );
}
