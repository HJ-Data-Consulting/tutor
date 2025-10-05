"use client";

import ChatWindow from "./components/ChatWindow";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center font-sans p-4">
      <header className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-3">
          Tech Tutor
        </h1>
        <p className="text-lg text-gray-600">
          Personalized tutoring to help you achieve your academic goals.
        </p>
      </header>
      
      {/* The ChatWindow will be positioned here, but fixed to the bottom right */}
      <ChatWindow />
    </div>
  );
}