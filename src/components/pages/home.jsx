import isEmpty from 'lodash.isempty';
import { useContext, useEffect } from 'react';
import SearchIcon from '../../assets/images/Search.png';
import DeleteIcon from '../../assets/images/Delete.png';
import Input from '../forms/input';
import Alert from '../misc/alert';
import Table from '../misc/table';
import Heading from '../misc/heading';
import IconButton from '../misc/iconButton';
import Button from '../misc/button';
import Toggle from '../misc/toggle';
import { isMobile } from '../../utils/screenSizeHelper';
import { EntryContext } from '../../store/entryContext';
import useSearch from '../../hooks/useSearch';

const Home = () => {
  const {
    inputs,
    data,
    error,
    setData,
    handleInputChange,
    handleSearch,
    handleClear,
  } = useSearch();
  const { city, country } = inputs;
  const { entries } = useContext(EntryContext);

  useEffect(() => {
    setData(entries[0]);
  }, [entries]);

  const handleSearchClick = () => handleSearch(city, country);

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
            inputValue={city}
            handleChange={handleInputChange}
          />
          <Input
            type='country'
            label='Country'
            inputValue={country}
            handleChange={handleInputChange}
          />
          {isMobile() ? (
            <div className='form__btn'>
              <Button
                label='Search'
                styleClass='form__btn--sm'
                handleClick={handleSearchClick}
              />
              <Button
                styleClass='form__btn--sm'
                label='Clear'
                handleClick={handleClear}
              />
            </div>
          ) : (
            <div className='form__icon-btn'>
              <IconButton
                imgSrc={SearchIcon}
                styleClass='form__icon-btn--lg'
                handleClick={handleSearchClick}
              />
              <IconButton
                imgSrc={DeleteIcon}
                styleClass='form__icon-btn--lg'
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
