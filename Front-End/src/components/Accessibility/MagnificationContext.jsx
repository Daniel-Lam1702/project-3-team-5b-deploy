import React, { createContext, useState, useEffect } from 'react';

// Create context
export const MagnificationContext = createContext();

// Provider component
export function MagnificationProvider({ children }) {
  // Check if magnification state exists in localStorage
  const [isMagnified, setIsMagnified] = useState(() => {
    const savedState = localStorage.getItem('isMagnified');
    return savedState ? JSON.parse(savedState) : false; // Default to false if not found
  });

  // Toggle magnification state and save to localStorage
  const toggleMagnification = () => {
    setIsMagnified((prev) => {
      const newState = !prev;
      localStorage.setItem('isMagnified', JSON.stringify(newState)); // Save state to localStorage
      return newState;
    });
  };

  useEffect(() => {
    const rootElement = document.documentElement; // Targets <html>
    const bodyElement = document.body; // Targets <body>
  
    if (isMagnified) {
      rootElement.classList.add('magnified');
      bodyElement.classList.add('magnified');
    } else {
      rootElement.classList.remove('magnified');
      bodyElement.classList.remove('magnified');
    }
  }, [isMagnified]);
  

  return (
    <MagnificationContext.Provider value={{ isMagnified, toggleMagnification }}>
      {children}
    </MagnificationContext.Provider>
  );
}
