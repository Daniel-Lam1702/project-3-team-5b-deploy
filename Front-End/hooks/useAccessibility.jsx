// hooks/useAccessibility.js
import { createContext, useContext, useReducer } from 'react';

// Define initial state
const initialState = {
  highContrast: false,
  textEnlarged: false,
  showAccessibilityPanel: false,
};

// Define actions
const TOGGLE_HIGH_CONTRAST = 'TOGGLE_HIGH_CONTRAST';
const TOGGLE_TEXT_ENLARGEMENT = 'TOGGLE_TEXT_ENLARGEMENT';
const TOGGLE_ACCESSIBILITY_PANEL = 'TOGGLE_ACCESSIBILITY_PANEL';

// Reducer function
const accessibilityReducer = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case TOGGLE_HIGH_CONTRAST:
      return { ...state, highContrast: !state.highContrast };
    case TOGGLE_TEXT_ENLARGEMENT:
      return { ...state, textEnlarged: !state.textEnlarged };
    case TOGGLE_ACCESSIBILITY_PANEL:
      return { ...state, showAccessibilityPanel: !state.showAccessibilityPanel };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// Create Context
const AccessibilityContext = createContext();

// Provider Component
export const AccessibilityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accessibilityReducer, initialState);

  return (
    <AccessibilityContext.Provider value={{ state, dispatch }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// Custom Hook to Use Context
export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
