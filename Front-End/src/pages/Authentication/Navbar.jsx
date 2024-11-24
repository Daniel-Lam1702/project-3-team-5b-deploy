import React, { useContext } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import './Navbar.css';
import { AccessibilityContext } from '../../../hooks/AccessibilityContext';
import { AccessibilityButton } from '../../components/Accessibility/AccessibilityButton';
import { Link } from 'react-router-dom';

const Navbar = ({backLink}) => {
  const { toggleAccessibilityPanel } = useContext(AccessibilityContext);

  return (
    <nav className="navbar">
      <ul>
        <li className="left">
          <AccessibilityButton/>
        </li>
        {backLink && (
          <li className="navbar-item">
            <Link to={backLink} className="back-link">
              Back
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
