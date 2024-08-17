import SunImage from '../../assets/images/sun.png';
import { formatTimestamp } from '../../utils/timestampHelper';

const Heading = ({ data }) => {
  return (
    <div className='heading'>
      <p>Today's Weather</p>
      <img src={SunImage} alt='logo' className='heading__logo' />
      <div className='heading__details'>
        <div className='heading__details--main'>
          <p className='heading__details--primary'>{data.temp}&deg;</p>
          <div className='heading__details--secondary'>
            <p>H: {data.maxTemp}&deg;</p>
            <p>L: {data.minTemp}&deg;</p>
          </div>
          <div className='bold light'>
            {data.city}, {data.country}
          </div>
        </div>
        <div className='heading__details--secondary-right light'>
          <p>{formatTimestamp(data.time)}</p>
          <p>Humidity: {data.humidity}%</p>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Heading;
