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
    oauthSignIn();
    navigate('/manager');
  }

  const onClickCustomerHandler = () => {
    navigate('/customer');
  }

  /*
 * Create form to request access token from Google's OAuth 2.0 server.
 */
function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  var form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  var params = {'client_id': '296008456961-qhf5m6rddmlddcp4fscadh9seos56jus.apps.googleusercontent.com',
                'redirect_uri': 'https://project-3-team-5b.onrender.com/manager',
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'};

  // Add form parameters as hidden input values.
  for (var p in params) {
    var input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
  }

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
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
