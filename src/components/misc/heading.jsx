import SunImage from '../../assets/images/sun.png';
import { formatTimestamp } from '../../utils/timestampHelper';

const Heading = ({ data }) => {
  return (
    <div className='heading'>
      <p>Today's Weather</p>
      <img src={SunImage} alt='logo' className='heading__logo' />
      <div className='heading__details'>
        <div className='heading__details--main'>
          <p className={`heading__details--primary`}>
            {Math.round(data.temp)}&deg;
          </p>
          <div className='heading__details--secondary'>
            <p>H: {Math.round(data.maxTemp)}&deg;</p>
            <p>L: {Math.round(data.minTemp)}&deg;</p>
          </div>
          <div className={`heading__details--secondary-bold`}>
            {data.city}, {data.country}
          </div>
        </div>
        <div className={`heading__details--secondary-right`}>
          <p>{formatTimestamp(data.time)}</p>
          <p>Humidity: {data.humidity}%</p>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
