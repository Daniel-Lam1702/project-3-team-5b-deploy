import React from 'react';
import './EntreeChoices.css'; // Ensure you have your styles defined

const EntreeChoices = ({ entrees, maxEntrees, selectedEntrees = [], onSelectEntrees, onContinue }) => {
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
                  // Deselect if already selected
                  onSelectEntrees(selectedEntrees.filter(e => e !== entree));
                } else if (selectedEntrees.length < maxEntrees) {
                  // Select if not already selected and max not reached
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
        onClick={onContinue} 
        disabled={selectedEntrees.length === 0}
      >
        Continue to Cart
      </button>
    </div>
  );
};

export default EntreeChoices;
