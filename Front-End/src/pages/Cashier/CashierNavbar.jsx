import React from 'react';
import {Link} from 'react-router-dom';

const CashierNavbar = () => {
    return (
      <nav className="navbar">
        <ul>
            <li className="back">
              <Link to="/cashier">Back</Link>
            </li>
            <li className="left">
              <Link to="/menu-board">Menu Board</Link>
            </li>
            <li className="right">
              <Link to="/cart">Cart</Link>
            </li>
        </ul>
      </nav>
    );
  };

  export default CashierNavbar;