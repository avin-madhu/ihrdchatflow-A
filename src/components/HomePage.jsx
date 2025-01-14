import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./Homepage.css";
function HomePage({ collegeLists, setCollegeLists }) {
  const [messages, setMessages] = useState([
    { message: "Hello! How can I help you today?", isUser: false },
  ]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
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
              Welcome to ChatFlow
            </h2>
            <p className="text-xl text-white/80 leading-relaxed font-light">
              Experience the next generation of conversational AI
            </p>
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
            </div>
            <ChatInput
              messages={messages}
              setMessages={setMessages}
              collegeLists={collegeLists}
              setCollegeLists={setCollegeLists}
            />
          </div>
        </div>
      </main>

      <footer className="bg-white/5 fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-white/60 text-sm">
            © 2024 ChatFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
