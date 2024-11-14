import React from 'react';
import PropTypes from 'prop-types';
import './EntreeChoices.css';

const EntreeChoices = ({ entrees, maxEntrees, selectedEntrees = [], onSelectEntrees, onAddToCart, selectedMenuItem }) => {
  const handleEntreeSelection = (entree) => {
    if (selectedEntrees.includes(entree)) {
      onSelectEntrees(selectedEntrees.filter(e => e !== entree)); // Deselect entree
    } else if (selectedEntrees.length < maxEntrees) {
      onSelectEntrees([...selectedEntrees, entree]); // Select entree if under max limit
    }
  };

  const handleAddToCart = () => {
    if (selectedEntrees.length > 0) {
      const updatedMenuItem = {
        ...selectedMenuItem, // Existing selected menu item
        entrees: selectedEntrees, // Add selected entrees
      };
      onAddToCart(updatedMenuItem); // Pass the updated menu item to onAddToCart
    }
  };

  const handleReset = () => {
    onSelectEntrees([]); // Deselect all entrees
  };

  return (
    <div className="entree-choices">
      <h2>Select Your Entree (Max: {maxEntrees})</h2>
      <p>You can select up to {maxEntrees} entrees.</p>
      <div className="entrees-list">
        {entrees.map((entree, index) => {
          const isSelected = selectedEntrees.includes(entree);
          return (
            <div
              key={index}
              className={`entree-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handleEntreeSelection(entree)} 
            >
              {entree}
            </div>
          );
        })}
      </div>
      <div className="entree-choices-buttons">
        <button 
          className={`continue-button ${selectedEntrees.length > 0 ? 'active' : 'disabled'}`} 
          onClick={handleAddToCart} 
          disabled={selectedEntrees.length === 0} // Disable if no entrees selected
        >
          Add to Cart
        </button>
        <button 
          className="reset-button" 
          onClick={handleReset} 
          disabled={selectedEntrees.length === 0} // Disable reset if nothing selected
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// PropTypes for validation
EntreeChoices.propTypes = {
  entrees: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxEntrees: PropTypes.number.isRequired,
  selectedEntrees: PropTypes.arrayOf(PropTypes.string),
  onSelectEntrees: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  selectedMenuItem: PropTypes.object.isRequired,
};

export default EntreeChoices;
