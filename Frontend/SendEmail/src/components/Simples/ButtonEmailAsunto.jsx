import PropTypes from "prop-types";

export default function ButtonEmailAsunto({ handler, text }) {
  return (
    <button onClick={handler} className="button-handlerStudio">
      {text}
    </button>
  );
}

ButtonEmailAsunto.propTypes = {
  handler: PropTypes.func,
  text: PropTypes.string.isRequired,
};
