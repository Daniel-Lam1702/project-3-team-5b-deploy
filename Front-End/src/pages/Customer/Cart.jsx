import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css'; 
import CartItem from './CartItem';

const Cart = ({ cartItems, onContinue, clearCart }) => {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items-list">
        <h3>Selected Items</h3>
        <ul>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={index}>
                <CartItem item={item} />
              </li>
            ))
          ) : (
            <li>No items in the cart</li>
          )}
        </ul>
      </div>
      <div className="cart-buttons">
        <button className="checkout-button" onClick={onContinue}>
          Proceed to Checkout
        </button>
        <button className="clear-cart-button" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      sides: PropTypes.oneOfType([ 
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf(PropTypes.shape({
          name: PropTypes.string,
        })),
      ]),
      entrees: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      drink: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
      appetizer: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  onContinue: PropTypes.func,
  clearCart: PropTypes.func,
};

Cart.defaultProps = {
  cartItems: [],
  onContinue: () => {},
  clearCart: () => {},
};

export default Cart;
