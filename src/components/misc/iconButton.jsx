const IconButton = ({ imgSrc, styleClass, handleClick }) => {
  return (
    <div className={`styled-icon ${styleClass}`} onClick={handleClick}>
      <img src={imgSrc} alt='IconButton' />
    </div>
  );
};

export default IconButton;
