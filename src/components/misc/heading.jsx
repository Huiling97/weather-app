import { useEffect, useState } from 'react';
import SunImage from '../../assets/images/sun.png';
import { isMobile } from '../../utils/screenSizeHelper';
import { formatTimestamp } from '../../utils/timestampHelper';

const Heading = ({ data }) => {
  const [styleClass, setStyleClass] = useState('layout-row');

  useEffect(() => {
    if (isMobile()) {
      setStyleClass('layout-column');
    }
  }, []);

  return (
    <div className='heading'>
      <p>Today's Weather</p>
      <img src={SunImage} alt='logo' className='heading__logo' />
      <p className='heading__primary'>{data.temp}&deg;</p>
      <div className='heading__secondary'>
        <div className='heading__secondary--row main'>
          <p>H: {data.maxTemp}&deg;</p>
          <p>L: {data.minTemp}&deg;</p>
        </div>
        <div className={`heading__secondary--row light`}>
          <div className='bold'>
            {data.city}, {data.country}
          </div>
          <div className={`${styleClass}`}>
            <p>{formatTimestamp(data.time)}</p>
            <p>Humidity: {data.humidity}%</p>
            <p>{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heading;
