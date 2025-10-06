"use client";

import ChatWindow from "./components/ChatWindow";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Services from "./components/Services";
import About from "./components/About";
import DeskAnimation from "./components/DeskAnimation";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center p-4 py-20">

          <DeskAnimation />
          <header className="text-center">
            <p className="text-lg text-gray-600">
              Personalized tutoring to help you achieve your academic goals.
            </p>
          </header>
          
        </section>

        <Services />
        <About />
      </main>
      
      <Footer />
      
      {/* The ChatWindow will be positioned here, but fixed to the bottom right */}
      <ChatWindow />
    </div>
  );
}