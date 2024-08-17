import isEmpty from 'lodash/isEmpty';
import { useContext, useEffect, useState } from 'react';
import SearchIcon from '../../assets/images/Search.png';
import DeleteIcon from '../../assets/images/Delete.png';
import Input from '../forms/input';
import Alert from '../misc/alert';
import Table from '../misc/table';
import Heading from '../misc/heading';
import IconButton from '../misc/iconButton';
import Button from '../misc/button';
import Toggle from '../misc/toggle';
import { fetchDataByCityCountry } from '../../utils/fetchDataHelper';
import { isMobile } from '../../utils/screenSizeHelper';
import { EntryContext } from '../../store/entryContext';

const Home = () => {
  const [cityInput, setCityInput] = useState('');
  const [countryInput, setCountryInput] = useState('');
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const { setEntry, addEntry } = useContext(EntryContext);

  useEffect(() => {
    const initState = JSON.parse(localStorage.getItem('weatherData')) || [];
    setData(initState[0]);
    setEntry(initState);
  }, []);

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
      <div className='toggle-container'>
        <Toggle />
      </div>
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
      </div>
    </div>
  );
};

export default Home;
