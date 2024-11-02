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

  // const handleStartOrder = () => {
  //   navigate('/menu'); 
  // };

  return (
    <div className="grid grid-cols-2 w-full h-[90vh] gap-4">
      <div className='flex justify-center items-center'>
        <LandingPageButton label='MANAGE STUFF' Icon={HomeIcon} style={style} onClick={() => {}}/>
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
