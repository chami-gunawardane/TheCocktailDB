import PropTypes from "prop-types";

const Button = ({ onClick, text, customClass, image }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 flex items-center justify-center ${customClass}`}
    >
      {image && <span className="mr-2">{image}</span>}
      {text}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  customClass: PropTypes.string,
  image: PropTypes.node, 
};

export default Button;
