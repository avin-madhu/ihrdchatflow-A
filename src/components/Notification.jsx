import React from "react";
import { AlertCircle, X } from "lucide-react";

function Notification({ message, onClose }) {
  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-md">
      <div className="mx-4 bg-[#4d70b0] text-white px-6 py-4 rounded-lg shadow-lg flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default Notification;
