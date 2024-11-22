import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SideChoices.css';

/**
 * SideChoices component for selecting sides.
 * @param {Object} props - The component props.
 * @param {Array} props.sides - List of available sides to choose from.
 * @param {number} props.maxSides - Maximum number of sides that can be selected.
 * @param {function} props.onContinue - Function to call when selection is complete.
 * @returns {JSX.Element} The SideChoices component.
 */
const SideChoices = ({ sides, maxSides, onContinue }) => {
  const [selectedSides, setSelectedSides] = useState([]);

  /**
   * Handles toggling side selection (selecting/deselecting sides).
   * @param {string} side - The side item to toggle.
   */
  const toggleSide = (side) => {
    if (selectedSides.includes(side)) {
      // Deselect side if already selected
      setSelectedSides(selectedSides.filter(s => s !== side));
    } else if (selectedSides.length < maxSides) {
      // Select side if under max limit
      setSelectedSides([...selectedSides, side]);
    }
  };

  /**
   * Handles the "Continue" button click, passing the selected sides to the parent component.
   */
  const handleContinue = () => {
    if (selectedSides.length > 0) {
      onContinue(selectedSides); // Pass selected sides to the parent
    }
  };

  /**
   * Handles the "Reset" button click, resetting the selected sides.
   */
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
