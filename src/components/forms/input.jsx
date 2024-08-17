import { useContext } from 'react';
import { ThemeContext } from '../../store/themeContext';

const Input = ({ type, label, inputValue, setInputValue, setError }) => {
  const { theme } = useContext(ThemeContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (setError) {
      setError('');
    }
  };

  return (
    <div className='input-container'>
      <div className={`input ${theme}`}>
        <label className='input__label-small'>{label}</label>
        <input
          className='input-plain'
          type='text'
          id={type}
          value={inputValue}
          onChange={handleChange}
          autoComplete='off'
        />
      </div>
    </div>
  );
};

export default Input;
