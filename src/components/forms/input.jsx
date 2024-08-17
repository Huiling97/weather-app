const Input = ({ type, label, inputValue, setInputValue, setError }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setError('');
  };

  return (
    <div className='input-container'>
      <div className='input'>
        <label className='input__label-small'>{label}</label>
        <input
          className='input-plain'
          type='text'
          id={type}
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Input;
