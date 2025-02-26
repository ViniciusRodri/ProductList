// src/components/Modal.js
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400 p-6 rounded-lg shadow-lg w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-gray-900 text-lg w-4"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
