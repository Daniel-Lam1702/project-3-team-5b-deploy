import React from 'react';
import './EntreeChoices.css';

const EntreeChoices = ({ entrees, maxEntrees, selectedEntrees = [], onSelectEntrees, onAddToCart }) => {
  return (
    <div className="entree-choices">
      <h2>Select Your Entree (Max: {maxEntrees})</h2>
      <div className="entrees-list">
        {entrees.map((entree, index) => {
          const isSelected = selectedEntrees.includes(entree);
          return (
            <div
              key={index}
              className={`entree-item ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                if (isSelected) {
                  onSelectEntrees(selectedEntrees.filter(e => e !== entree));
                } else if (selectedEntrees.length < maxEntrees) {
                  onSelectEntrees([...selectedEntrees, entree]);
                }
              }} 
            >
              {entree}
            </div>
          );
        })}
      </div>
      <button 
        className={`continue-button ${selectedEntrees.length > 0 ? 'active' : ''}`} 
        onClick={() => {
          if (selectedEntrees.length > 0) {
            onAddToCart(selectedEntrees);
          }
        }} 
        disabled={selectedEntrees.length === 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default EntreeChoices;
