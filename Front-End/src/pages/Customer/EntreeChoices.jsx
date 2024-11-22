import React from 'react';

function EntreeChoices({ entrees, maxEntrees, selectedEntrees, onSelectEntrees, onContinue }) {
  const handleSelectEntree = (entree) => {
    if (selectedEntrees.includes(entree)) {
      onSelectEntrees(selectedEntrees.filter(item => item !== entree)); // Remove entree if it's already selected
    } else if (selectedEntrees.length < maxEntrees) {
      onSelectEntrees([...selectedEntrees, entree]); // Add entree if the limit is not reached
    }
  };

  return (
    <div className="entree-choices">
      <h2>Select Entrees</h2>
      <div className="entrees-list">
        {entrees.map((entree, index) => (
          <div
            key={index}
            className={`entree-item ${selectedEntrees.includes(entree) ? 'selected' : ''}`}
            onClick={() => handleSelectEntree(entree)}
          >
            <h3>{entree}</h3>
          </div>
        ))}
      </div>
      <button 
        onClick={onContinue} 
        disabled={selectedEntrees.length === 0}
        className="continue-button"
      >
        Continue to Cart
      </button>
    </div>
  );
}

export default EntreeChoices;
