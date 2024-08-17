import { useState, useCallback, useContext } from 'react';
import { fetchDataByCityCountry } from '../utils/fetchDataHelper';
import { EntryContext } from '../store/entryContext';

const useSearch = () => {
  const [inputs, setInputs] = useState({ city: '', country: '' });
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const { addEntry } = useContext(EntryContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const validateInputs = (city) => {
    if (!city.trim()) {
      setError('Please input a city');
      return false;
    }
    return true;
  };

  const handleSearch = useCallback(
    async (city, country) => {
      if (!validateInputs(city)) return;

      try {
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
          setInputs({ city: '', country: '' });
          setError('');
        }
      } catch (e) {
        console.error('Error in handle search', e);
        setError('No data found');
      }
    },
    [inputs]
  );

  const handleClear = useCallback(() => {
    setInputs({ city: '', country: '' });
    setError('');
  }, []);

  return {
    inputs,
    data,
    error,
    setData,
    handleInputChange,
    handleSearch,
    handleClear,
  };
};

export default useSearch;
