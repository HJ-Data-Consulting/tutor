import { useState } from 'react';
import ChatBubble from './ChatBubble';
import OptionBubble from './OptionBubble';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

type ConversationState = 'initial' | 'awaiting_email' | 'email_collected';

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "What kind of tutoring are you looking for?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [conversationState, setConversationState] = useState<ConversationState>('initial');
  const [selectedService, setSelectedService] = useState<string>('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (conversationState === 'awaiting_email') {
      const emailRegex = /\S+@\S+\.\S+/;
      if (emailRegex.test(input)) {
        await sendEmail(selectedService, input);
        const botMessage: Message = { text: "Thank you! We will get back to you shortly.", sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
        setConversationState('email_collected');
      } else {
        const botMessage: Message = { text: "Please enter a valid email address.", sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      }
    } else {
      // Mock bot response for general chat
      setTimeout(() => {
        const botMessage: Message = { text: `I received: "${input}"`, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      }, 500);
    }
  };

  const handleOptionClick = (option: string) => {
    const userMessage: Message = { text: option, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);
    setSelectedService(option);
    setConversationState('awaiting_email');

    setTimeout(() => {
      const botMessage: Message = { text: "Great! What is your email address?", sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const sendEmail = async (service: string, email: string) => {
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ service, email }),
      });
    } catch (error) {
      console.error("Failed to send email", error);
      // Handle error gracefully in the UI
      const botMessage: Message = { text: "Sorry, something went wrong. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    }
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
        {showOptions && (
          <div className="flex justify-center items-center flex-wrap">
            <OptionBubble text="Academic" onClick={() => handleOptionClick("Academic")} />
            <OptionBubble text="Internship" onClick={() => handleOptionClick("Internship")} />
            <OptionBubble text="Professional" onClick={() => handleOptionClick("Professional")} />
            <OptionBubble text="Personal" onClick={() => handleOptionClick("Personal")} />
          </div>
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 border rounded-l-md p-2"
            placeholder={conversationState === 'awaiting_email' ? "Enter your email..." : "Type a message..."}
          />
          <button onClick={handleSend} className="bg-black text-white px-4 rounded-r-md hover:bg-gray-800">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
