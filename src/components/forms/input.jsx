const Input = ({ type, label, inputValue, handleChange }) => {
  return (
    <div className='input-container'>
      <div className='input'>
        <label className='input__label-small'>{label}</label>
        <input
          className='input-plain'
          type='text'
          id={type}
          name={type}
          value={inputValue}
          onChange={handleChange}
          autoComplete='off'
        />
      </div>
    </div>
  );
};

export default Input;
