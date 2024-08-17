import axios from 'axios';

const fetchDataByCityCountry = async (city, country) => {
  const query = `${city}${country ? `,${country}` : ''}`;
  const url = `${process.env.REACT_APP_OPEN_WEATHER_API_PATH}?q=${query}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`;
  const { data } = await axios.post(url);
  return data;
};

export { fetchDataByCityCountry };
