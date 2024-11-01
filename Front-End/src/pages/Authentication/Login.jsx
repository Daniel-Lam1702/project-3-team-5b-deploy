import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const navigate = useNavigate(); 

  // Button handlers
  const onClickMenuBoardHandler = () => {
    navigate('/menu-board');
  }

  const onClickCashierHandler = () => {
    navigate('/cashier'); 
  }

  const onClickManagerHandler = () => {
    navigate('/manager');
  }

  const onClickCustomerHandler = () => {
    navigate('/customer');
  }

  return <div className="login-page flex flex-col gap-14 justify-center items-center">
    <div className='flex gap-10'>
      <button className='bg-black text-white p-8 rounded-2xl font-bold text-3xl' onClick={onClickMenuBoardHandler}>Menu Board</button>
      <button className='bg-black text-white p-8 rounded-2xl font-bold text-3xl' onClick={onClickCustomerHandler}>Customer View</button>
    </div>
    <div className='flex flex-col gap-4 w-[100%] items-center'>
      <input className='p-5 w-[50%] rounded-full border-black border-2' placeholder = 'Enter Username:'></input>
      <input className='p-5 w-[50%] rounded-full border-black border-2' placeholder = 'Enter Password:' type='password'></input>
    </div>
    <div className='flex gap-10 justify-center w-[100%] items-center'>
      <button className='bg-black text-white p-5 font-bold w-[300px] h-[183.18px] rounded-2xl text-3xl' onClick={onClickManagerHandler}>Login As Manager</button>
      <button className='bg-black text-white p-5 font-bold w-[300px] h-[183.18px] rounded-2xl  text-3xl' onClick={onClickCashierHandler}>Login As Cashier</button>
    </div>
  </div>;
}

export default Login;
