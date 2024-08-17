import { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext';

const IconButton = ({ imgSrc, styleClass, handleClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`styled-icon ${styleClass} ${theme}`} onClick={handleClick}>
      <img src={imgSrc} alt='IconButton' />
    </div>
  );
};

export default IconButton;
