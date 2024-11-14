import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ManageStuff.css';

function ManageStuff() {
  const navigate = useNavigate();

  return (
    <div className="manage-stuff-page">
      <h1>Manage Stuff</h1>
      <button className="manage-button" onClick={() => navigate('/inventory')}>
        Inventory
      </button>
      <button className="manage-button" onClick={() => navigate('/sales')}>
        Sales
      </button>
    </div>
  );
}

export default ManageStuff;
