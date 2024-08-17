import SearchIcon from '../../assets/images/Search.png';
import DeleteIcon from '../../assets/images/Delete.png';
import IconButton from './iconButton';
import { formatTimestamp } from '../../utils/timestampHelper';
import { useContext } from 'react';
import { EntryContext } from '../../store/entryContext';
import { ThemeContext } from '../../store/themeContext';

const Card = ({ entry, handleClick }) => {
  const { deleteEntry } = useContext(EntryContext);
  const { theme } = useContext(ThemeContext);
  const { city, country, time } = entry;

  const handleDelete = () => {
    deleteEntry(time);
  };

  return (
    <div className={`card ${theme}`}>
      <div className='card__details'>
        <p>
          {city}, {country}
        </p>
        <p className='card__details--small'>{formatTimestamp(time)}</p>
      </div>
      <div className='card__icon-container'>
        <IconButton
          imgSrc={SearchIcon}
          styleClass='card__icon--light'
          handleClick={() => handleClick(city, country)}
        />
        <IconButton
          imgSrc={DeleteIcon}
          styleClass='card__icon--light'
          handleClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Card;
