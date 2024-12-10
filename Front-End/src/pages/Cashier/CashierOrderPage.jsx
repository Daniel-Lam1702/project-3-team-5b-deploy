import React, { useState } from 'react';
import '../Customer/MenuPage.css';
import CashierNavbar from './CashierNavbar';
import MenuPage from '../Customer/MenuPage';

/**
 * `CashierOrderPage` is the cashier's page for handling the order creation process. 
 * It allows the cashier to select menu items, sides, entrees, and view the cart.
 * 
 * @component
 * @example
 * const setShowSidebar = (isVisible) => console.log(isVisible ? 'Sidebar visible' : 'Sidebar hidden');
 * return <CashierOrderPage setShowSidebar={setShowSidebar} />;
 * 
 * @param {Function} setShowSidebar - A function to control the visibility of the sidebar.
 * 
 * @returns {JSX.Element} A JSX element representing the cashier's order page, with views for menu selection, side and entree choices, and the cart.
 */
function CashierOrderPage({ cartItems, setCartItems }) {
  return (
    <div className="navbar-container">
      <CashierNavbar />
      <MenuPage isCustomer={false} cartItems={cartItems} setCartItems={setCartItems}/>
    </div>
  );
}

export default CashierOrderPage;
