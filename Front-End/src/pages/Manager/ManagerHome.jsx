import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ContrastIcon from '@mui/icons-material/Contrast';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import LandingPageButton from '../../components/Customer/LandingPageButton';
import './ManagerHome.css';

function ManagerHome() {
  const navigate = useNavigate(); 
  const [style, setStyle] = useState({
    textColor: '#FFFFFF',
    buttonBackground: '#000000',
  });

  const [isHighContrastMode, setIsHighContrast] = useState(false);

  const toggleContrast = () => {
    setIsHighContrast(!isHighContrastMode);
    setStyle({
      textColor: isHighContrastMode ? '#FFFFFF' : '#1AEBFF',
      buttonBackground: isHighContrastMode ? '#000000' : '#FFFFFF', 
    });
  };

  var logout = function() {
    document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://project-3-team-5b.onrender.com";
}

  // const handleStartOrder = () => {
  //   navigate('/menu'); 
  // };

  return (
    <div className="grid grid-cols-2 w-full h-[90vh] gap-4">
      <div className='flex justify-center items-center'>
        <button className="back-button" onClick={() => {navigate('/')}}>
          &#8592; Home
        </button>
        <LandingPageButton label='Logout' Icon={ExitIcon} style={style} onClick={() => {}}/>
        <LandingPageButton label='Inventory' Icon={HomeIcon} style={style} onClick={() => {}}/>
        <LandingPageButton label='Sales Reports' Icon={HomeIcon} style={style} onClick={() => {}}/>
        <LandingPageButton label='Admin' Icon={HomeIcon} style={style} onClick={() => {}}/>
      </div>
      <div className='flex justify-center items-center '>
        <ul className='grid grid-cols-1 gap-10'>
          <li>
            <LandingPageButton label='Change Language' Icon={GTranslateIcon} style={style} onClick={() => {}} />
          </li>
          <li>
            <LandingPageButton label={"High-contrast mode"} Icon={ContrastIcon} style={style} onClick={toggleContrast} />
          </li>
          <li>
            <LandingPageButton label={"Enlarge Text"} Icon={TextIncreaseIcon} style={style} onClick={() => {}} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ManagerHome;
