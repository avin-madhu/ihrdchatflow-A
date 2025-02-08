import React, { useState, useRef, useEffect } from "react";
import { ThreeDots } from 'react-loader-spinner';
import {
  Send,
  Mic,
  Moon,
  Menu,
  X,
  School,
  Sun,
  ChevronDown,
} from "lucide-react";

const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

const CollegeSelector = ({
  selectedCollege,
  onSelect,
  colleges,
  isDarkMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedCollegeName = colleges.find(
    (c) => c.id === selectedCollege
  )?.name;

  return (
    <div className="relative z-10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
          isDarkMode
            ? "bg-gray-700/50 hover:bg-gray-600/50"
            : "bg-gray-200/50 hover:bg-gray-300/50"
        } transition-colors`}
      >
        <span className={isDarkMode ? "text-white" : "text-gray-900"}>
          {selectedCollegeName}
        </span>
        <ChevronDown
          className={`w-4 h-4 z-10 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full mt-1 w-55 rounded-lg shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          } z-10`}
        >
          {colleges.map((college) => (
            <button
              key={college.id}
              onClick={() => {
                onSelect(college.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 first:rounded-t-lg last:rounded-b-lg ${
                isDarkMode
                  ? "text-white hover:bg-gray-700"
                  : "text-gray-900 hover:bg-gray-100"
              } ${
                selectedCollege === college.id
                  ? isDarkMode
                    ? "bg-gray-700"
                    : "bg-gray-100"
                  : ""
              }`}
            >
              {college.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isBotProcessing, setIsBotProcessing] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample colleges - replace with your actual college data from API
  const colleges = [
    { id: 1, name: "College of Engineering Chengannur" },
    { id: 2, name: "College of Engineering Karunagappally" },
    { id: 3, name: "Model Engineering College" },
    { id: 4, name: "College of Applied Science Adoor" },
    { id: 5, name: "College of Engineering Poonjar" },
  ];

  const handleCollegeChange = async (collegeId) => {
    setIsModalOpen(false);
  };

  // Rest of the existing useEffects...
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startVoiceInput = () => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert("Speech recognition is not supported in your browser.");
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        isBot: false,
      };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");

      setIsBotProcessing(true);

      try {
        const response = await fetch("http://127.0.0.1:5000/get_data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: inputText,
            colleges: selectedCollege,
          }),
        });

        if (!response.ok) throw new Error("Failed to get response");

        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { id: prev.length + 1, text: data.output, isBot: true },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "Sorry, there was an error. Please try again.",
            isBot: true,
          },
        ]);
      } finally {
        setIsBotProcessing(false);
      }
    }
  };

  const bgColor = isDarkMode
    ? "bg-[#11192e]"
    : "bg-gradient-to-br from-gray-100 to-white";
  const textColor = isDarkMode ? "text-white" : "text-gray-900";
  const navBg = isDarkMode ? "bg-gray-800/50" : "bg-white/50";
  const chatBg = isDarkMode ? "bg-gray-800/50" : "bg-white/50";
  const inputBg = isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50";
  const borderColor = isDarkMode ? "border-gray-700/50" : "border-gray-200/50";

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-200`}>
      {/* Navbar */}
      <nav
        className={`${navBg} backdrop-blur-lg border-b ${borderColor} relative z-50`}
      >
        <div className="max-w-8xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <School className="h-8 w-8 text-blue-500" />
              <span className={`ml-2 text-xl font-bold ${textColor}`}>
                Radius
              </span>
              {selectedCollege && (
                <div className="ml-4 relative">
                  <CollegeSelector
                    selectedCollege={selectedCollege}
                    onSelect={handleCollegeChange}
                    colleges={colleges}
                    isDarkMode={isDarkMode}
                  />
                </div>
              )}
            </div>

            {/* Rest of the navbar code... */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Rest of the component structure remains the same... */}
      <div className="max-w-4xl mx-auto p-4 flex-1">
        <div
          className={`h-full ${chatBg} backdrop-blur-lg rounded-2xl shadow-xl border ${borderColor} flex flex-col`}
        >
          {/* Chat Header */}
          <div
            className={`p-4 border-b ${borderColor} flex items-center justify-between shrink-0`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              </div>
              <div>
                {/* <h2 className={`${textColor} font-medium`}>College Assistant</h2>
                <p className="text-gray-400 text-sm">Online</p> */}
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isBot ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    message.isBot
                      ? isDarkMode
                        ? "bg-gray-700/50 text-white"
                        : "bg-gray-200/50 text-gray-900"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              </div>
            ))}
           {isBotProcessing && (
              <div
                className={`flex justify-start`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    isDarkMode ? 'bg-gray-700/50 text-white' : 'bg-gray-200/50 text-gray-900'
                  }`}
                >
                  <div className="flex justify-center">
                  <ThreeDots
                    color="#00BFFF"
                    height={80}
                    width={80}
                  />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={`p-4 border-t ${borderColor} shrink-0`}>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className={`flex-1 ${inputBg} ${textColor} placeholder-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                onClick={startVoiceInput}
                className={`p-2 ${
                  isListening ? "bg-red-500" : "hover:bg-gray-700/50"
                } rounded-lg transition-colors`}
              >
                <Mic
                  className={`w-5 h-5 ${
                    isListening ? "text-white" : "text-gray-400"
                  }`}
                />
              </button>
              <button
                onClick={handleSend}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Initial Modal */}
      <Modal isOpen={isModalOpen}>
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">
            Welcome to Radius
          </h2>
          <p className="text-gray-300">Please select a college to discuss:</p>
          <div className="space-y-2">
            {colleges.map((college) => (
              <label
                key={college.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700/50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="college"
                  value={college.id}
                  checked={selectedCollege === college.id}
                  onChange={() => setSelectedCollege(college.id)}
                  className="form-radio text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
                <span className="text-white">{college.name}</span>
              </label>
            ))}
          </div>
          <button
            onClick={() => handleCollegeChange(selectedCollege)}
            disabled={isLoading || !selectedCollege}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Start Chat"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
