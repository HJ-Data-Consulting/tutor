import { useState, useRef, useEffect } from 'react';
import ChatBubble from './ChatBubble';
import OptionBubble from './OptionBubble';
import TypingIndicator from './TypingIndicator';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

type ConversationState =
  | 'initial'
  | 'awaiting_main_choice'
  | 'awaiting_professional_choice'
  | 'awaiting_internship_choice'
  | 'awaiting_personal_choice'
  | 'awaiting_academic_choice'
  | 'awaiting_email'
  | 'email_collected'
  | 'awaiting_restart';

export default function ChatWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "What kind of tutoring are you looking for?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationState, setConversationState] = useState<ConversationState>('awaiting_main_choice');
  const [selectedService, setSelectedService] = useState<string>('');
  const [windowHeight, setWindowHeight] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    // Set initial window height
    setWindowHeight(window.innerHeight);
    
    // Handle window resize
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    if (conversationState === 'awaiting_email') {
      const emailRegex = /\S+@\S+\.\S+/;
      if (emailRegex.test(input)) {
        setIsTyping(true);
        await sendEmail(selectedService, input);
        setIsTyping(false);
        const botMessage1: Message = { text: "Thank you! We will get back to you shortly.", sender: 'bot' };
        const botMessage2: Message = { text: "Do you want to make another request?", sender: 'bot' };
        setMessages(prev => [...prev, botMessage1, botMessage2]);
        setConversationState('awaiting_restart');
        setShowOptions(true);
      } else {
        const botMessage: Message = { text: "Please enter a valid email address.", sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      }
    } else {
      // Mock bot response for general chat
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const botMessage: Message = { text: `I received: "${input}"`, sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  const handleOptionClick = (option: string) => {
    const userMessage: Message = { text: option, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setShowOptions(false);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (conversationState === 'awaiting_main_choice') {
        setSelectedService(option);
        if (option === 'Professional' || option === 'Internship') {
          setConversationState(option === 'Professional' ? 'awaiting_professional_choice' : 'awaiting_internship_choice');
          const botMessage: Message = { text: `Great! What topic are you interested in?`, sender: 'bot' };
          setMessages(prev => [...prev, botMessage]);
          setShowOptions(true);
        } else if (option === 'Personal') {
          setConversationState('awaiting_personal_choice');
          const botMessage: Message = { text: `Great! What topic are you interested in?`, sender: 'bot' };
          setMessages(prev => [...prev, botMessage]);
          setShowOptions(true);
        } else if (option === 'Academic') {
          setConversationState('awaiting_academic_choice');
          const botMessage: Message = { text: `Great! What topic are you interested in?`, sender: 'bot' };
          setMessages(prev => [...prev, botMessage]);
          setShowOptions(true);
        }
      } else if (conversationState === 'awaiting_restart') {
        if (option === 'Yes') {
          setMessages([{ text: "What kind of tutoring are you looking for?", sender: 'bot' }]);
          setConversationState('awaiting_main_choice');
          setShowOptions(true);
        } else {
          setIsOpen(false);
        }
      } else {
        setSelectedService(prev => `${prev} - ${option}`);
        setConversationState('awaiting_email');
        const botMessage: Message = { text: "Great! What is your email address?", sender: 'bot' };
        setMessages(prev => [...prev, botMessage]);
      }
    }, 1000);
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

  const renderOptions = () => {
    if (!showOptions || isTyping) return null;

    switch (conversationState) {
      case 'awaiting_main_choice':
        return (
          <div className="flex justify-center items-center flex-wrap">
            <OptionBubble text="Academic" onClick={() => handleOptionClick("Academic")} />
            <OptionBubble text="Internship" onClick={() => handleOptionClick("Internship")} />
            <OptionBubble text="Professional" onClick={() => handleOptionClick("Professional")} />
            <OptionBubble text="Personal" onClick={() => handleOptionClick("Personal")} />
          </div>
        );
      case 'awaiting_professional_choice':
      case 'awaiting_internship_choice':
        return (
          <div className="flex justify-center items-center flex-wrap">
            <OptionBubble text="Git" onClick={() => handleOptionClick("Git")} />
            <OptionBubble text="GitHub" onClick={() => handleOptionClick("GitHub")} />
            <OptionBubble text="Command Line" onClick={() => handleOptionClick("Command Line")} />
            <OptionBubble text="Docker" onClick={() => handleOptionClick("Docker")} />
            <OptionBubble text="ChatGPT" onClick={() => handleOptionClick("ChatGPT")} />
          </div>
        );
      case 'awaiting_personal_choice':
        return (
          <div className="flex justify-center items-center flex-wrap">
            <OptionBubble text="App" onClick={() => handleOptionClick("App")} />
            <OptionBubble text="Website" onClick={() => handleOptionClick("Website")} />
            <OptionBubble text="Database" onClick={() => handleOptionClick("Database")} />
          </div>
        );
      case 'awaiting_academic_choice':
        return (
          <div className="flex justify-center items-center flex-wrap">
            <OptionBubble text="Computer Science" onClick={() => handleOptionClick("Computer Science")} />
            <OptionBubble text="Coding" onClick={() => handleOptionClick("Coding")} />
            <OptionBubble text="Databases" onClick={() => handleOptionClick("Databases")} />
          </div>
        );
      case 'awaiting_restart':
        return (
          <div className="flex justify-center items-center flex-wrap">
            <OptionBubble text="Yes" onClick={() => handleOptionClick("Yes")} />
            <OptionBubble text="No" onClick={() => setIsOpen(false)} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Chat Toggle Button - Sticky and always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-50 md:bottom-6 md:right-6"
        style={{ position: 'fixed' }} // Ensures it's always sticky
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Chat Window - Responsive */}
      {isOpen && (
        <div 
          className="fixed z-50 bg-white rounded-lg shadow-xl flex flex-col transition-all duration-300 ease-in-out
                     /* Mobile styles */
                     inset-x-2 bottom-2
                     /* Desktop styles */ 
                     md:bottom-20 md:right-4 md:left-auto md:top-auto md:w-96 md:h-[28rem] md:inset-x-auto"
          style={{
            // Mobile: Use calculated viewport height
            top: window.innerWidth < 768 ? '4rem' : 'auto',
            maxHeight: window.innerWidth < 768 ? `${windowHeight - 80}px` : '28rem'
          }}
        >
          {/* Header */}
          <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center flex-shrink-0">
            <h3 className="font-bold">Tutor Bot</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300 transition-colors md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto min-h-0 max-h-full">
            {messages.map((msg, index) => (
              <ChatBubble key={index} text={msg.text} sender={msg.sender} />
            ))}
            {isTyping && <TypingIndicator />}
            {renderOptions()}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t flex-shrink-0">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 border rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder={conversationState === 'awaiting_email' ? "Enter your email..." : "Type a message..."}
                disabled={conversationState !== 'awaiting_email'}
              />
              <button 
                onClick={handleSend} 
                className="bg-black text-white px-4 rounded-r-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={conversationState !== 'awaiting_email' || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
