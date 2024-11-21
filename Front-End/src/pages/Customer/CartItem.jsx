import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
  const renderItems = (items) => {
    if (Array.isArray(items)) {
      return items.map(item => item.name).join(', ');
    }
    return null;
  };

  return (
    <div className="cart-item">
      <h4>{item.menuItem.name}</h4>
      {item.side && (
        <div className="sides">
          <strong>Sides: </strong>
          {renderItems(item.side)}
        </div>
      )}
      {item.entrees && (
        <div className="entrees">
          <strong>Entrees: </strong>{renderItems(item.entrees)}
        </div>
      )}
      {item.drink && (
        <div className="drink">
          <strong>Drink: </strong>{renderItems(item.drink)}
        </div>
      )}
      {item.appetizer && (
        <div className="appetizer">
          <strong>Appetizer: </strong>{renderItems(item.appetizer)}
        </div>
      )}
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    menuItem: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    side: PropTypes.oneOfType([ 
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    ]),
    entrees: PropTypes.arrayOf(PropTypes.string),
    drink: PropTypes.arrayOf(PropTypes.string),
    appetizer: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default CartItem;
