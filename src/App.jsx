import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CollegeSelector from './components/CollegeSelector';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCollegeSelectorOpen, setIsCollegeSelectorOpen] = useState(false);

  const handleNavigation = (page) => {
    if (page === 'features') {
      setIsCollegeSelectorOpen(true);
    } else {
      setCurrentPage(page);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800">
      <Header onNavigate={handleNavigation} />
      <CollegeSelector 
        isOpen={isCollegeSelectorOpen} 
        onClose={() => setIsCollegeSelectorOpen(false)} 
      />
      {renderCurrentPage()}
    </div>
  );
}

export default App;