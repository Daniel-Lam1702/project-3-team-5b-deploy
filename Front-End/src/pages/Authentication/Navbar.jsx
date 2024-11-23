import React, { useContext } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import './Navbar.css';
import { AccessibilityContext } from '../../../hooks/AccessibilityContext';
import { AccessibilityButton } from '../../components/Accessibility/AccessibilityButton';

const Navbar = () => {
  const { toggleAccessibilityPanel } = useContext(AccessibilityContext);

  return (
    <nav className="navbar">
      <ul>
        <li className="left">
          <AccessibilityButton/>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
