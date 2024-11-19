import React, { useState } from "react";
import Cart from "../Customer/Cart";  // Import the Cart component
import { Link } from "react-router-dom"; // If you still want other links in the navbar

const CashierNavbar = ({ cartItems, onContinue, clearCart }) => {
  // State to toggle the cart view
  const [showCart, setShowCart] = useState(false);

  const toggleCartView = () => {
    setShowCart((prevState) => !prevState);  // Toggle visibility of the cart
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li className="back">
            <Link to="/cashier">Back</Link>
          </li>
          <li className="left">
            <Link to="/menu-board">Menu Board</Link>
          </li>
          <li className="right">
            <button onClick={toggleCartView}>Cart</button>  {/* Button to toggle cart visibility */}
          </li>
        </ul>
      </nav>

      {/* Conditional rendering of the Cart view */}
      {showCart && (
        <div className="cart-view">
          <Cart cartItems={cartItems} onContinue={onContinue} clearCart={clearCart} />
        </div>
      )}
    </div>
  );
};

export default CashierNavbar;
