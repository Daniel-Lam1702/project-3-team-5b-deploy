import React, { useContext } from 'react';
import LandingPageButton from "../Customer/LandingPageButton";
import ContrastIcon from '@mui/icons-material/Contrast';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import './AccessibilityPanel.css';
import { AccessibilityContext } from "../../../hooks/AccessibilityContext";
import MagnificationToggle from './MagnificationToggle';
import GoogleTranslate from '../../pages/Translation/GoogleTranslate';

const AccessibilityPanel = () => {
    const {
        isMagnified,
        toggleMagnification,
        isHighContrast,
        toggleHighContrast,
        showAccessibilityPanel,
        toggleAccessibilityPanel,
    } = useContext(AccessibilityContext); // Using context for the panel visibility state

    return (
        <div className={`accessibility-panel ${showAccessibilityPanel ? 'visible' : 'hidden'}`}>
            <button
                aria-label="Close Accessibility Panel"
                className="close-button"
                onClick={toggleAccessibilityPanel}
            >
                CLOSE (X)
            </button>
            <ul className="flex flex-col align-middle mt-4 gap-10">
                <li className='flex translate-button justify-center'>
                    <GTranslateIcon className="translate-icon"/>
                    <GoogleTranslate/>
                </li>
                <li>
                    <LandingPageButton
                        label={isHighContrast ? "Disable High Contrast" : "Enable High Contrast"}
                        Icon={ContrastIcon}
                        onClick={toggleHighContrast}
                    />
                </li>
                <li>
                    <MagnificationToggle isMagnified={isMagnified} toggleMagnification={toggleMagnification}/>
                </li>
            </ul>
        </div>
    );
};

export default AccessibilityPanel;
