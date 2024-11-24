import React, { useContext } from 'react';
import { AccessibilityContext } from "../../../hooks/AccessibilityContext";
import SettingsIcon from '@mui/icons-material/Settings';


export const AccessibilityButton = () => {
    const { toggleAccessibilityPanel } = useContext(AccessibilityContext);
    return (
    <button
        className='accessibility-button'
        aria-label="Toggle Accessibility Panel"
        onClick={toggleAccessibilityPanel}
      >
        <SettingsIcon className="icon"/>
      </button>
    );
}