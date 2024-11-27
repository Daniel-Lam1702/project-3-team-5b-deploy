import React, { createContext, useState, useEffect } from 'react';

// Create context
export const AccessibilityContext = createContext();

// Provider component
export function AccessibilityProvider({ children }) {
  // State for magnification
  const [isMagnified, setIsMagnified] = useState(() => {
    const savedState = localStorage.getItem('isMagnified');
    return savedState ? JSON.parse(savedState) : false;
  });

  // State for high contrast
  const [isHighContrast, setIsHighContrast] = useState(() => {
    const savedState = localStorage.getItem('isHighContrast');
    return savedState ? JSON.parse(savedState) : false;
  });

  // State for showing/hiding the accessibility panel
  const [showAccessibilityPanel, setShowAccessibilityPanel] = useState(false);

  // Toggle magnification state
  const toggleMagnification = () => {
    setIsMagnified((prev) => {
      const newState = !prev;
      localStorage.setItem('isMagnified', JSON.stringify(newState));
      return newState;
    });
  };

  // Toggle high contrast state
  const toggleHighContrast = () => {
    setIsHighContrast((prev) => {
      const newState = !prev;
      localStorage.setItem('isHighContrast', JSON.stringify(newState));
      return newState;
    });
  };

  // Toggle accessibility panel visibility
  const toggleAccessibilityPanel = () => {
    setShowAccessibilityPanel((prev) => !prev);
  };

  // Apply magnified class based on state
  useEffect(() => {
    const rootElement = document.documentElement;
    const bodyElement = document.body;

    if (isMagnified) {
      rootElement.classList.add('magnified');
      bodyElement.classList.add('magnified');
    } else {
      rootElement.classList.remove('magnified');
      bodyElement.classList.remove('magnified');
    }
  }, [isMagnified]);

  // Apply high-contrast class based on state
  useEffect(() => {
    const rootElement = document.documentElement;
    const bodyElement = document.body;

    if (isHighContrast) {
      rootElement.classList.add('high-contrast');
      bodyElement.classList.add('high-contrast');
    } else {
      rootElement.classList.remove('high-contrast');
      bodyElement.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  return (
    <AccessibilityContext.Provider
      value={{
        isMagnified,
        toggleMagnification,
        isHighContrast,
        toggleHighContrast,
        showAccessibilityPanel,
        toggleAccessibilityPanel,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}
