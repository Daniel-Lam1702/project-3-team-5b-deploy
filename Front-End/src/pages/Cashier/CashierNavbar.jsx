import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

/**
 * `CashierNavbar` provides a navigation bar for the cashier interface with options to navigate 
 * back, view the menu board, and the cart view.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array} props.cartItems - List of items in the cart.
 * @param {Function} props.onContinue - Callback to handle the "continue" action from the cart.
 * @param {Function} props.clearCart - Callback to clear the cart.
 * 
 * @example
 * const cartItems = [{ id: 1, name: "Item1", price: 10 }];
 * const onContinue = () => { console.log("Continue clicked"); };
 * const clearCart = () => { console.log("Cart cleared"); };
 * return <CashierNavbar cartItems={cartItems} onContinue={onContinue} clearCart={clearCart} />;
 * 
 * @returns {JSX.Element} A navigation bar with a toggleable cart view.
 */
const CashierNavbar = ({ cartItems, onContinue, clearCart }) => {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar">
        <ul>
          {/* Button to navigate back to the previous page */}
          <li className="back">
            <button className="text-white text-xl" onClick={() => navigate(-1)}>Back</button>
          </li>
          {/* Link to navigate to the menu board */}
          <li className="left">
            <Link to="/menu-board">Menu Board</Link>
          </li>
          {/* Button to navigate to the cart page */}
          <li className="right">
            <button className="text-white text-xl" onClick={() => navigate('/cart')}>Cart</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CashierNavbar;
