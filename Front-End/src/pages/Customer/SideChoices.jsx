import React, { useState } from 'react';
import './SideChoices.css';

const SideChoices = ({ sides, maxSides, onContinue }) => {
  const [selectedSides, setSelectedSides] = useState([]);

  const toggleSide = (side) => {
    if (selectedSides.includes(side)) {
      setSelectedSides(selectedSides.filter(s => s !== side)); // Deselect side
    } else {
      if (selectedSides.length < maxSides) {
        setSelectedSides([...selectedSides, side]); // Select side if under max limit
      }
    }
  };

  const handleContinue = () => {
    if (selectedSides.length > 0) {
      onContinue(selectedSides); // Pass selected sides back to MenuPage
    }
  };

  return (
    <div className="side-choices">
      <h2>Select Your Sides</h2>
      <div className="sides-list">
        {sides.map((side, index) => (
          <div 
            key={index} 
            className={`side-item ${selectedSides.includes(side) ? 'selected' : ''}`} 
            onClick={() => toggleSide(side)} // Toggle side selection
          >
            {side}
          </div>
        ))}
      </div>
      <button 
        className={`continue-button ${selectedSides.length > 0 ? 'active' : 'disabled'}`} 
        onClick={handleContinue} 
        disabled={selectedSides.length === 0} // Disable if no sides selected
      >
        Continue
      </button>
    </div>
  );
};

export default SideChoices;
