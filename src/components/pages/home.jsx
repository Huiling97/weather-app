import isEmpty from 'lodash/isEmpty';
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '../../assets/images/Search.png';
import DeleteIcon from '../../assets/images/Delete.png';
import Input from '../forms/input';
import Alert from '../misc/alert';
import Table from '../misc/table';
import Heading from '../misc/heading';
import IconButton from '../misc/iconButton';
import { fetchDataByCityCountry } from '../../utils/fetchDataHelper';
import { isMobile } from '../../utils/screenSizeHelper';
import { EntryContext } from '../../store/entryContext';
import Button from '../misc/button';

const MOCK_ENTRIES = [
  {
    city: 'New York',
    country: 'US',
    description: 'Clear',
    temp: 25.3,
    minTemp: 22.0,
    maxTemp: 28.0,
    humidity: 60,
    time: '1723786199',
  },
  {
    city: 'London',
    country: 'GB',
    description: 'Light rain',
    temp: 18.2,
    minTemp: 16.5,
    maxTemp: 20.0,
    humidity: 80,
    time: '1723786199',
  },
  {
    city: 'Tokyo',
    country: 'JP',
    description: 'Partly cloudy',
    temp: 30.1,
    minTemp: 28.0,
    maxTemp: 32.0,
    humidity: 65,
    time: '1723786199',
  },
  {
    city: 'Sydney',
    country: 'AU',
    description: 'Sunny',
    temp: 22.5,
    minTemp: 20.0,
    maxTemp: 24.0,
    humidity: 55,
    time: '1723786199',
  },
  {
    city: 'Paris',
    country: 'FR',
    description: 'Overcast',
    temp: 20.0,
    minTemp: 18.0,
    maxTemp: 22.0,
    humidity: 70,
    time: '1723786199',
  },
  {
    city: 'Osaka',
    country: 'JP',
    description: 'Overcast',
    temp: 20.0,
    minTemp: 18.0,
    maxTemp: 22.0,
    humidity: 70,
    time: '1723786199',
  },
  {
    city: 'Singapore',
    country: 'SG',
    description: 'Overcast',
    temp: 20.0,
    minTemp: 18.0,
    maxTemp: 22.0,
    humidity: 70,
    time: '1723786199',
  },
  {
    city: 'Paris',
    country: 'FR',
    description: 'Overcast',
    temp: 20.0,
    minTemp: 18.0,
    maxTemp: 22.0,
    humidity: 70,
    time: '1723786199',
  },
];

const MOCK_DATA = {
  city: 'New York',
  country: 'US',
  description: 'Clear',
  temp: 25.3,
  minTemp: 22.0,
  maxTemp: 28.0,
  humidity: 60,
  time: '1723786199',
};

const Home = () => {
  const [cityInput, setCityInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const { entries, setEntry, addEntry } = useContext(EntryContext);

  useEffect(() => {
    const initState = JSON.parse(sessionStorage.getItem('weatherData')) || [];
    setData(initState[0]);
    // setData({MOCK_DATA});
    setEntry(initState);
  }, [setEntry]);

  const handleSearch = async (city, country) => {
    try {
      if (city.trim() === '') {
        setError('Please input a city');
      } else {
        const response = await fetchDataByCityCountry(city, country);
        if (response) {
          const { id, weather, main, dt, sys, name } = response;
          const data = {
            id,
            city: name,
            country: sys.country,
            description: weather[0].main,
            temp: main.temp,
            minTemp: main.temp_min,
            maxTemp: main.temp_max,
            humidity: main.humidity,
            time: dt,
          };
          setData(data);
          addEntry(data);
          setCityInput('');
          setCountryInput('');
          setError('');
        }
      }
    } catch (e) {
      console.error('error in handle search', e);
      setError('No data found');
    }
  };

  const handleClear = () => {
    setCityInput('');
    setCountryInput('');
    setError('');
  };

  return (
    <div>
      <div className='form-container'>
        <div className='form'>
          <Input
            type='city'
            label='City'
            inputValue={cityInput}
            setInputValue={setCityInput}
            setError={setError}
          />
          <Input
            type='country'
            label='Country'
            inputValue={countryInput}
            setInputValue={setCountryInput}
          />
          {isMobile() ? (
            <div className='form__btn'>
              <Button
                label='Search'
                styleClass='form__btn--light'
                handleClick={() => handleSearch(cityInput, countryInput)}
              />
              <Button
                styleClass='form__btn--light'
                label='Clear'
                handleClick={handleClear}
              />
            </div>
          ) : (
            <div className='form__icon-button'>
              <IconButton
                imgSrc={SearchIcon}
                styleClass='form__icon--dark'
                handleClick={() => handleSearch(cityInput, countryInput)}
              />
              <IconButton
                imgSrc={DeleteIcon}
                styleClass='form__icon--dark'
                handleClick={handleClear}
              />
            </div>
          )}
        </div>
        <>{error && <Alert styleClass='alert-error' message={error} />}</>
      </div>
      <div className='data-container'>
        {!isEmpty(data) && <Heading data={data} />}
        <Table handleClick={handleSearch} />
        {/* <Table entries={MOCK_ENTRIES} handleClick={handleSearch} /> */}
      </div>
    </div>
  );
};

export default Home;
