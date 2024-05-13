import PropTypes from "prop-types";

export default function EstudiosEnviados({ estudiosEnviados }) {
  return (
    <>
      <h2>Estudios Juridicos Emails: Enviados</h2>
      <ul>
        {estudiosEnviados.map(({ id, nombre, fecha_envio }) => {
          const fechaEnvio = new Date(fecha_envio);
          const updateFecha = fechaEnvio
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");

          return (
            <li key={id}>
              <p>{nombre}</p>
              <p>{updateFecha}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
}

EstudiosEnviados.propTypes = {
  estudiosEnviados: PropTypes.array.isRequired,
};
