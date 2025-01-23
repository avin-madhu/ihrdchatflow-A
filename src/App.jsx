import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import CollegeSelector from "./components/CollegeSelector";
import SplashScreen from "./components/SplashScreen";
import Notification from "./components/Notification";
function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isCollegeSelectorOpen, setIsCollegeSelectorOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [collegeLists, setCollegeLists] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  const handleNavigation = (page) => {
    if (page === "features") {
      setIsCollegeSelectorOpen(true);
    } else {
      setCurrentPage(page);
    }
  };
  const handleSplashComplete = () => {
    setShowSplash(false);
    setShowSplash(false);
    // Add 3 second delay before showing the notification
    setTimeout(() => {
      setShowNotification(true);
      // Hide notification after 4 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 4000);
    }, 2000);
  };
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <HomePage selectedCollege={selectedCollege} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800">
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <>
          <Header
            onNavigate={handleNavigation}
            selectedCollege={selectedCollege}
            onCollegeSelect={setSelectedCollege}
          />
          <CollegeSelector
            isOpen={isCollegeSelectorOpen}
            onClose={() => setIsCollegeSelectorOpen(false)}
            collegeLists={collegeLists}
            setCollegeLists={setCollegeLists}
          />
          {showNotification && (
            <Notification
              message="Please choose college before starting your chat!"
              onClose={() => setShowNotification(false)}
            />
          )}
          {renderCurrentPage()}
        </>
      )}
    </div>
  );
}

export default App;
