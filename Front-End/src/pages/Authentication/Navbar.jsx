import React, { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import './Navbar.css';
import { useAccessibility } from '../../../hooks/useAccessibility';

const Navbar = () => {
    const { state, dispatch } = useAccessibility();
    const onSettingsClick = () => {
        dispatch({ type: 'TOGGLE_ACCESSIBILITY_PANEL' });
    }

    return (
      <nav className="navbar">
        <ul>
            <li className="left">
              <button onClick={onSettingsClick}><SettingsIcon className='icon'></SettingsIcon></button>
            </li>
        </ul>
      </nav>
    );
  };

  export default Navbar;