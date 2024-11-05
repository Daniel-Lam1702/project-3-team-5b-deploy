import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
      <nav className="navbar">
        <ul>
        <li className="left">
              <Link to="/customer">Back</Link>
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

  export default Navbar;