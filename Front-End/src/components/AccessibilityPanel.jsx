
import { useAccessibility } from "../../hooks/useAccessibility";
import LandingPageButton from "./Customer/LandingPageButton";
import ContrastIcon from '@mui/icons-material/Contrast';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import './AccessibilityPanel.css';

const AcccessibilityPanel = () => {
    const { state, dispatch } = useAccessibility();
    const toggleContrast = () => {
        dispatch({ type: 'TOGGLE_HIGH_CONTRAST' });
        document.documentElement.setAttribute(
          'data-theme',
          state.highContrast ? 'default' : 'high-contrast'
        );
    }

    const toggleTextEnlargement = () => {
        dispatch({ type: 'TOGGLE_TEXT_ENLARGEMENT' });
        document.documentElement.setAttribute(
          'data-text',
          state.textEnlarged ? 'default' : 'enlarged'
        );
    };

    const toggleAccessibilityPanel = () => {
      dispatch({ type: 'TOGGLE_ACCESSIBILITY_PANEL' });
    };

    if (!state.showAccessibilityPanel){
        return null;
    }

    return (
    <div className="accessibility-panel">
        <button label='Close Accessibility Panel' className="close-button" onClick={toggleAccessibilityPanel}>X</button>
        <ul className='grid grid-cols-1 gap-10'>
          <li>
            <LandingPageButton label='Change Language' Icon={GTranslateIcon} style={{ textColor: '#000000', buttonBackground: '#FFFFFF'}} onClick={() => {}} />
          </li>
          <li>
            <LandingPageButton label={"High-contrast mode"} Icon={ContrastIcon} style={{ textColor: '#000000', buttonBackground: '#FFFFFF'}} onClick={toggleContrast} />
          </li>
          <li>
            <LandingPageButton label={"Enlarge Text"} Icon={TextIncreaseIcon} style={{ textColor: '#000000', buttonBackground: '#FFFFFF'}} onClick={toggleTextEnlargement} />
          </li>
        </ul>
    </div>);
}

export default AcccessibilityPanel;