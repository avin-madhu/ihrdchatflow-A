import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Image, Paperclip, Settings, Moon, Menu, X, School } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Website = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [numColleges, setNumColleges] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleCollegeSubmit = async () => {
    if (!numColleges || isNaN(numColleges) || numColleges < 1) {
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/initialize-colleges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ numberOfColleges: parseInt(numColleges) }),
      });

      if (!response.ok) throw new Error('Failed to initialize');

      const data = await response.json();
      setMessages([{ id: 1, text: `Ready to discuss ${numColleges} colleges! How can I help?`, isBot: true }]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
      setMessages([{ id: 1, text: "Sorry, there was an error initializing. Please try again.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = { id: messages.length + 1, text: inputText, isBot: false };
      setMessages(prev => [...prev, newMessage]);
      setInputText("");

      // Simulate API call to backend
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputText }),
        });

        if (!response.ok) throw new Error('Failed to get response');

        const data = await response.json();
        setMessages(prev => [...prev, { id: prev.length + 1, text: data.response, isBot: true }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { id: prev.length + 1, text: "Sorry, there was an error. Please try again.", isBot: true }]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navbar */}
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <School className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-white">College Chat</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Dashboard
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Colleges
              </Button>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                About
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button variant="ghost" className="w-full text-left text-gray-300 hover:text-white">
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full text-left text-gray-300 hover:text-white">
                Colleges
              </Button>
              <Button variant="ghost" className="w-full text-left text-gray-300 hover:text-white">
                About
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-4rem)]">
        {/* Chat Interface */}
        <div className="h-full bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700/50 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700/50 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              </div>
              <div>
                <h2 className="text-white font-medium">College Assistant</h2>
                <p className="text-gray-400 text-sm">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <Moon className="w-5 h-5 text-gray-400" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-700/50 text-white'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700/50 shrink-0">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5 text-gray-400" />
              </Button>
              <Button variant="ghost" size="icon">
                <Image className="w-5 h-5 text-gray-400" />
              </Button>
              <Input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 bg-gray-700/50 text-white placeholder-gray-400"
              />
              <Button variant="ghost" size="icon">
                <Mic className="w-5 h-5 text-gray-400" />
              </Button>
              <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Initial Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Welcome to College Chat</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-300">
              Please enter the number of colleges you'd like to discuss:
            </p>
            <Input
              type="number"
              min="1"
              value={numColleges}
              onChange={(e) => setNumColleges(e.target.value)}
              placeholder="Enter number of colleges"
              className="bg-gray-700 text-white border-gray-600"
            />
            <Button
              onClick={handleCollegeSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Start Chat"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Website;