import React, { useRef, useEffect, useState } from "react";
import { Send, Mic } from "lucide-react";
import "./ChatInput.css";

function ChatInput({ messages, setMessages, selectedCollege }) {
  const textareaRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false); // Track recording state
  const [recognition, setRecognition] = useState(null); // Store SpeechRecognition instance

  useEffect(() => {
    // Initialize SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";
      setRecognition(recognitionInstance);

      recognitionInstance.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        textareaRef.current.value = transcript; // Update input with transcript
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };
    } else {
      console.warn("SpeechRecognition is not supported in this browser.");
    }
  }, []);


  const sendMsg = () => {
    const message = textareaRef.current.value;
    if (message !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, isUser: true },
      ]);
      textareaRef.current.value = ""; // Clear the textarea
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMsg();
    }
  };

  const toggleRecording = () => {
    if (!recognition) return;
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="flex msg-box items-center space-x-2 bg-white/5 rounded-lg p-2">
      <input
        type="text"
        placeholder="Type your message..."
        ref={textareaRef}
        className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-white/50"
        onKeyDown={handleKeyDown}
      />
      <button
        className={`p-2 text-white/80 hover:text-white transition-colors ${
          isRecording ? "animate-pulse text-red-500" : ""
        }`}
        onClick={toggleRecording}
      >
        <Mic className="h-5 w-5" />
      </button>
      <button
        className="p-2 rounded-full bg-[#4d70b0] hover:bg-[] transition-colors"
        onClick={sendMsg}
      >
        <Send className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}

export default ChatInput;
