import React, { useState } from 'react';
import { MessageCircle, Menu, Home } from 'lucide-react';
import Sidebar from './Sidebar';
import "./Header.css"

function Header({ onNavigate }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="bg-white/10 backdrop-blur-md fixed top-0 w-full z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <MessageCircle className="h-8 w-8 text-white" />
              <h1 id="logoText" className="text-2xl font-bold text-white font-serif">ChatFlow</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => onNavigate('home')}
                className="text-white/80 hover:text-white transition-colors font-medium flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </button>
              <button 
                onClick={() => onNavigate('features')}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                About
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="text-white/80 hover:text-white transition-colors font-medium"
              >
                Contact
              </button>
            </nav>
            <button 
              className="md:hidden text-white"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigate={onNavigate}
      />
    </>
  );
}

export default Header;