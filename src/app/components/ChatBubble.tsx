export interface Message {
  text: string;
  sender: 'user' | 'bot';
  options?: string[];
}

export default function ChatBubble({ text, sender }: Message) {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`rounded-lg px-4 py-2 ${isUser ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'}`}>
        {text}
      </div>
    </div>
  );
}
