import React, { useState, useEffect } from "react";

function SplashScreen({ onComplete }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const splashTexts = [
    "Welcome aboard!",
    "Finding all the good stuff...",
    "Sprinkling some magic...",
    "Almost there!",
    "Ready to go! Welcome to RADIUS!",
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => {
        if (prev === splashTexts.length - 1) {
          clearInterval(textInterval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 1000);
          }, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(textInterval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800">
      <div
        className="relative w-full h-full"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1636819488524-1f019c4e1c44?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-24 h-24 mb-8 relative">
            <div
              className="absolute inset-0 border-4 border-purple-500 rounded-full animate-spin"
              style={{
                borderRightColor: "transparent",
                animationDuration: "2s",
              }}
            />
            <div className="absolute inset-0 border-4 border-white rounded-full animate-ping opacity-75" />
          </div>

          <div className="text-center relative">
            {splashTexts.map((text, index) => (
              <div
                key={text}
                className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 w-80
                  ${
                    index === currentTextIndex
                      ? "opacity-100 transform translate-y-0"
                      : index < currentTextIndex
                      ? "opacity-0 transform -translate-y-8"
                      : "opacity-0 transform translate-y-8"
                  }`}
              >
                <h2 className="text-3xl font-bold text-white mb-2">{text}</h2>
                {index === currentTextIndex && (
                  <div className="flex justify-center space-x-2 mt-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SplashScreen;
