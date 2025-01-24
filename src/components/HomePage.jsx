// HomePage.jsx
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./Homepage.css";
import styled from "styled-components";

function HomePage({ selectedCollege }) {
  const [messages, setMessages] = useState([
    { message: "Hello! How can I help you today?", isUser: false },
  ]);

  const [isBotProcessing, setIsBotProcessing] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleBackendRequest = async () => {
    setIsBotProcessing(true);
    const response = await fetch("https://radius-pjnb.onrender.com/get_data", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        question: messages[messages.length - 1]?.message || "",
        colleges: selectedCollege,
      }),
    });

    if (!response.ok) {
      console.error("No response received!");
      setIsBotProcessing(false);
      return;
    }

    const data = await response.json();
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: data["output"], isUser: false },
    ]);
    setIsBotProcessing(false);
  };

  useEffect(() => {
    if (messages.length > 0 && messages.length % 2 === 0) {
      handleBackendRequest();
    }
  }, [messages]);

  return (
    <>
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <section className="text-center space-y-4">
            <h2
              id="mainTitle"
              className="text-4xl md:text-5xl font-bold text-white font-serif"
            >
              WELCOME TO RADIUS
            </h2>
            <p className="text-xl text-white/80 leading-relaxed font-light"></p>
          </section>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6  mt-12">
            <div
              ref={chatContainerRef}
              id="chatContainerId"
              className=" chat-container space-y-4 max-h-96 overflow-y-auto  mb-4"
            >
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  {...msg}
                  messages={messages}
                  setMessages={setMessages}
                />
              ))}
              {isBotProcessing && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-4 rounded-xl bg-white/10 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-2 relative">
                        <StyledWrapper>
                          <section className="dots-container">
                            <div className="dot" />
                            <div className="dot" />
                            <div className="dot" />
                          </section>
                        </StyledWrapper>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ChatInput
              messages={messages}
              setMessages={setMessages}
              selectedCollege={selectedCollege}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white/5 fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-white/60 text-sm">
            2025 RADIUS. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

const StyledWrapper = styled.div`
  .dots-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .dot {
    height: 10px;
    width: 10px;
    margin-right: 10px;
    border-radius: 10px;
    background-color:rgb(123, 182, 255);
    animation: pulse 1.5s infinite ease-in-out;
  }

  .dot:last-child {
    margin-right: 0;
  }

  .dot:nth-child(1) {
    animation-delay: -0.3s;
  }

  .dot:nth-child(2) {
    animation-delay: -0.1s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.1s;
  }

  @keyframes pulse {
    0% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }

    50% {
      transform: scale(1.2);
      background-color: #6793fb;
      box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
    }

    100% {
      transform: scale(0.8);
      background-color: #b3d4fc;
      box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
    }
  }
`;

export default HomePage;
