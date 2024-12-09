import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import './CustomerHome.css';
import { AccessibilityContext } from '../../../hooks/AccessibilityContext';
import { AccessibilityButton } from '../../components/Accessibility/AccessibilityButton';

/**
 * `CustomerHome` is the main landing page for the customer, featuring a button to start an order
 * and accessibility options like changing the language, enabling high-contrast mode, and enlarging text.
 * It utilizes context to determine if text should be magnified based on user preferences.
 * 
 * @component
 * @example
 * return <CustomerHome />
 */
function CustomerHome() {
  const navigate = useNavigate(); 
  const [style, setStyle] = useState({
    textColor: '#FFFFFF',
    buttonBackground: '#000000',
  });
  const { isMagnified } = useContext(AccessibilityContext);

  /**
   * Navigates to the menu page when the start order button is clicked.
   * 
   * @function
   * @returns {void}
   */
  const handleStartOrder = () => {
    navigate('/menu'); 
  };

  return (
    <>
      <nav className="navbar mb-2">
        <ul>
          <li>
            <AccessibilityButton/>
          </li>
          <li>
            <button onClick={() => navigate('/')} className="back-button-cart">
              Back
            </button>
          </li>
        </ul>
      </nav>
      <div className={`flex justify-center w-full h-[80vh] gap-4 ${isMagnified ? 'magnified' : ''}`}>
        <div className="flex justify-center items-center">
          <button
            className={`customer-start-order-button w-4/5 h-4/5 p-4 rounded-lg flex flex-col justify-center items-center gap-2`}
            onClick={handleStartOrder}
          >
            <AddShoppingCartIcon className="shopping-cart"/>
            <h1>START ORDER</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default CustomerHome;
