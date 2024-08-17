import { useContext } from 'react';
import SunImage from '../../assets/images/sun.png';
import { formatTimestamp } from '../../utils/timestampHelper';
import { ThemeContext } from '../../store/themeContext';

const Heading = ({ data }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className='heading'>
      <p>Today's Weather</p>
      <img src={SunImage} alt='logo' className='heading__logo' />
      <div className='heading__details'>
        <div className='heading__details--main'>
          <p className={`heading__details--primary ${theme}-theme--dark`}>
            {data.temp}&deg;
          </p>
          <div className='heading__details--secondary'>
            <p>H: {data.maxTemp}&deg;</p>
            <p>L: {data.minTemp}&deg;</p>
          </div>
          <div
            className={`heading__details--secondary-bold ${theme}-theme--light`}
          >
            {data.city}, {data.country}
          </div>
        </div>
        <div
          className={`heading__details--secondary-right ${theme}-theme--light`}
        >
          <p>{formatTimestamp(data.time)}</p>
          <p>Humidity: {data.humidity}%</p>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
