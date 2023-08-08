const Button = ({ cta, classColor, onHandleClick, disabled, width }) => {
  return (
    <button
      disabled={disabled}
      className={`btn ${classColor}`}
      style={{ width: width }}
      onClick={onHandleClick}
    >
      {cta}
    </button>
  );
};

Button.defaultProps = {
  classColor: "btn-primary",
  cta: "Texto",
  disabled: false,
  onHandleClick: () => {},
};

export default Button;
