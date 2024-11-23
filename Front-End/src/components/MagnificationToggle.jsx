
import React, { useContext } from 'react';
import { MagnificationContext } from './MagnificationContext'; 

function MagnificationToggle() {
  const { isMagnified, toggleMagnification } = useContext(MagnificationContext); 

  return (
    <button className="magnification-toggle" onClick={toggleMagnification}>
      {isMagnified ? '🔍 Zoom Out' : '🔍 Zoom In'}
    </button>
  );
}

export default MagnificationToggle;
