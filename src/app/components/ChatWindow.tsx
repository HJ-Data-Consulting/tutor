"use client";

import { useState } from 'react';
import ChatBubble from './ChatBubble';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Mock bot response
    setTimeout(() => {
      const botMessage: Message = { text: `I received: "${input}"`, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)} 
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      >
        Chat
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[28rem] bg-white rounded-lg shadow-xl flex flex-col">
      <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-bold">Tutor Bot</h3>
        <button onClick={() => setIsOpen(false)} className="text-white font-bold">_</button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <ChatBubble key={index} text={msg.text} sender={msg.sender} />
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border rounded-l-md p-2"
            placeholder="Type a message..."
          />
          <button onClick={handleSend} className="bg-black text-white px-4 rounded-r-md hover:bg-gray-800">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
