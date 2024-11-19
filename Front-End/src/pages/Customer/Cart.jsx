import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css'; // Ensure to add your CSS styles here
import CartItem from './CartItem'; // Imported component

const Cart = ({ cartItems, onContinue, clearCart }) => {
  const renderSides = (sides) => {
    if (Array.isArray(sides)) {
      return sides.map((side, index) => (
        <span key={index}>{side.name || side}</span> // handle both object and string cases
      ));
    }
    return null;
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items-list">
        <h3>Selected Items</h3>
        <ul>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={index}>
                <CartItem item={item} renderSides={renderSides} />
              </li>
            ))
          ) : (
            <li>No items in the cart</li>
          )}
        </ul>
      </div>
      {onContinue && clearCart && (
        <div className="cart-buttons">
          <button className="checkout-button" onClick={onContinue}>
            Proceed to Checkout
          </button>
          <button className="clear-cart-button" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      entrees: PropTypes.oneOfType([ 
        PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          })
        ),
        PropTypes.arrayOf(PropTypes.string),
      ]),
      sides: PropTypes.oneOfType([ 
        PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          })
        ),
        PropTypes.arrayOf(PropTypes.string),
      ]),
      drink: PropTypes.oneOfType([ 
        PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          })
        ),
        PropTypes.arrayOf(PropTypes.string),
      ]),
      appetizer: PropTypes.oneOfType([ 
        PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          })
        ),
        PropTypes.arrayOf(PropTypes.string),
      ]),
    })
  ).isRequired,
  onContinue: PropTypes.func,
  clearCart: PropTypes.func,
};

export default Cart;
