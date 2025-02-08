import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import HeroPage from './HeroPage';
import ChatPage from './ChatPage';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;