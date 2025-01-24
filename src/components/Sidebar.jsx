import React, { useState } from "react";
import { X, Home, ChevronDown } from "lucide-react";

function Sidebar({
  isOpen,
  onClose,
  onNavigate,
  selectedCollege,
  onCollegeSelect,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const colleges = [
    { id: "1", name: "College of Engineering Chengannur" },
    { id: "2", name: "College of Engineeering Karungapally" },
    { id: "3", name: "" },
  ];

  const handleNavClick = (page) => {
    onNavigate(page);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-indigo-900 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4">
          <button className="text-white mb-8 float-right" onClick={onClose}>
            <X className="h-6 w-6" />
          </button>

          <nav className="flex flex-col space-y-4 mt-16">
            <button
              onClick={() => handleNavClick("home")}
              className="text-white/80 hover:text-white transition-colors font-medium p-2 text-left flex items-center space-x-2"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-white/80 hover:text-white transition-colors font-medium p-2 text-left flex items-center justify-between w-full"
              >
                <span>
                  {selectedCollege
                    ? colleges.find((c) => c.id === selectedCollege)?.name
                    : "Choose College"}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isDropdownOpen && (
                <div className="bg-white/10 rounded-lg overflow-hidden mt-1">
                  {colleges.map((college) => (
                    <button
                      key={college.id}
                      className="w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/20 transition-colors"
                      onClick={() => {
                        onCollegeSelect(college.id);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {college.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick("about")}
              className="text-white/80 hover:text-white transition-colors font-medium p-2 text-left"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-white/80 hover:text-white transition-colors font-medium p-2 text-left"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
