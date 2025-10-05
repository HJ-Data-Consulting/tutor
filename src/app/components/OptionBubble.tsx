"use client";

interface OptionBubbleProps {
  text: string;
  onClick: () => void;
}

export default function OptionBubble({ text, onClick }: OptionBubbleProps) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 text-gray-800 rounded-full px-4 py-2 m-1 hover:bg-gray-300"
    >
      {text}
    </button>
  );
}
