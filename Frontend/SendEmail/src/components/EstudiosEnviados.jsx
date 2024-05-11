import PropTypes from "prop-types";

export default function EstudiosEnviados({ estudiosEnviados }) {
  return (
    <>
      <h2>Estudios Juridicos Emails: Enviados</h2>
      <ul>
        {estudiosEnviados.map(({ id, nombre }) => (
          <li key={id}>{nombre}</li>
        ))}
      </ul>
    </>
  );
}

EstudiosEnviados.propTypes = {
  estudiosEnviados: PropTypes.array.isRequired,
};
