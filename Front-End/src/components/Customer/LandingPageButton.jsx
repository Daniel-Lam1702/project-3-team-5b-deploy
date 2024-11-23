import React from 'react';
import PropTypes from 'prop-types';

function LandingPageButton({ label, Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="landing-page-button bg-black text-white p-8 rounded-lg flex justify-center items-center gap-8"
    >
      {Icon && <Icon />}
      <h2 className='text-white' >{label}</h2>
    </button>
  );
}

// Define prop types for LandingPageButton
LandingPageButton.propTypes = {
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  onClick: PropTypes.func.isRequired,
};

export default LandingPageButton;
