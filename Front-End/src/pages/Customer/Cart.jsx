import React from 'react';
import PropTypes from 'prop-types';
import './Cart.css'; // Ensure to add your CSS styles here


const CartItem = ({ item }) => {
  return (
    <>
      <strong>Menu Item:</strong> {item.menuItem?.name || 'Unnamed Item'}
      <br />
      {item.side && item.side.length > 0 && (
        <>
          <strong>Side:</strong> {item.side.map(side => side.name).join(', ')}
          <br />
        </>
      )}
      {item.entrees && item.entrees.length > 0 && (
        <>
          <strong>Entrees:</strong> {item.entrees.map(entree => entree.name).join(', ')}
          <br />
        </>
      )}
      {item.drink && item.drink.length > 0 && (
        <>
          <strong>Drink:</strong> {item.drink.map(drink => drink.name).join(', ')}
          <br />
        </>
      )}
      {item.appetizer && item.appetizer.length > 0 && (
        <>
          <strong>Appetizer:</strong> {item.appetizer.map(appetizer => appetizer.name).join(', ')}
          <br />
        </>
      )}
    </>
  );
};

// Adding prop types validation
CartItem.propTypes = {
  item: PropTypes.shape({
    menuItem: PropTypes.shape({
      name: PropTypes.string,
    }),
    side: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    entrees: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    drink: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    appetizer: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  }).isRequired,
};



const Cart = ({ cartItems, onContinue }) => {
  if (!cartItems) {
    return <div>Loading Cart...</div>;
  }
  console.log(cartItems);
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-item">
        <h3>Selected Items</h3>
        <ul>
          {cartItems.length > 0 ? (
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
      <button className="checkout-button" onClick={onContinue}>
        Proceed to Checkout
      </button>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItem: PropTypes.shape({
        name: PropTypes.string
      }).isRequired,
      entrees: PropTypes.arrayOf(PropTypes.string),
      side: PropTypes.arrayOf(PropTypes.string),
      drink: PropTypes.arrayOf(PropTypes.string),
      appetizer: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default Cart;
