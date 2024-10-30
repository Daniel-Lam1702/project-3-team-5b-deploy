import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleMenuBoardClick = () => {
    navigate('/menu-board'); 
  };

  return (
    <div>
      <h2>Login Page</h2>
      <button onClick={handleMenuBoardClick}>Go to Menu Board</button>
    </div>
  );
}

export default Login;
