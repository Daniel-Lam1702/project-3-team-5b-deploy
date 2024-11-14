import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SideChoices.css';

const SideChoices = ({ sides, maxSides, onContinue }) => {
  const [selectedSides, setSelectedSides] = useState([]);

  const toggleSide = (side) => {
    if (selectedSides.includes(side)) {
      setSelectedSides(selectedSides.filter(s => s !== side)); // Deselect side
    } else if (selectedSides.length < maxSides) {
      setSelectedSides([...selectedSides, side]); // Select side if under max limit
    }
  };

  const handleContinue = () => {
    if (selectedSides.length > 0) {
      onContinue(selectedSides); // Pass selected sides back to MenuPage
    }
  };

  const handleReset = () => {
    setSelectedSides([]); // Deselect all sides
  };

  return (
    <div className="side-choices">
      <h2>Select Your Sides</h2>
      <p>You can select up to {maxSides} sides.</p>
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
      <div className="side-choices-buttons">
        <button 
          className={`continue-button ${selectedSides.length > 0 ? 'active' : 'disabled'}`} 
          onClick={handleContinue} 
          disabled={selectedSides.length === 0} // Disable if no sides selected
        >
          Continue
        </button>
        <button 
          className="reset-button" 
          onClick={handleReset} 
          disabled={selectedSides.length === 0} // Disable reset if nothing selected
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// PropTypes for validation
SideChoices.propTypes = {
  sides: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxSides: PropTypes.number.isRequired,
  onContinue: PropTypes.func.isRequired,
};

export default SideChoices;
