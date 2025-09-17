/*
 * This is a Next.js and TypeScript alert component.
 * This component displays an alert message at the top of the screen.
 * 
 * Structure:
 * - Left icon (info icon)
 * - Center text
 * - Right close button with X mark icon
 * 
 * Styles:
 * - Position: fixed at the top
 * - Width: full width with padding applied to the entire component
 * - Background color: light blue
 * - Border color: dark blue
 * - Text color: dark blue
 */

import React from 'react';

interface AlertProps {
  message: string;
  onClose: () => void;
  type?: 'info' | 'success' | 'warning' | 'error';
}

const Alert: React.FC<AlertProps> = ({ message, onClose, type = 'info' }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full p-4 bg-blue-100 border-b border-blue-300 text-blue-800">
      {/* Left Icon */}
      <div className="flex items-center">
        <svg 
          className="w-5 h-5 mr-3" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
            clipRule="evenodd" 
          />
        </svg>
        
        {/* Center Text */}
        <span className="font-medium">{message}</span>
      </div>
      
      {/* Right Close Button */}
      <button
        onClick={onClose}
        className="flex items-center justify-center w-6 h-6 ml-4 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded transition-colors duration-200"
        aria-label="Close alert"
      >
        <svg 
          className="w-4 h-4" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
