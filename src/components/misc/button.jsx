const Button = ({ label, styleClass, handleClick }) => {
  return (
    <p className={styleClass} onClick={handleClick}>
      {label}
    </p>
  );
};

export default Button;
