import DeleteStudios from "./DeleteStudiosButton";
import EnviadoButton from "./EnviadoButton";
import PropTypes from "prop-types";

export default function EstudiosPendientes({
  estudiosNoEnviados,
  url,
  fetchEstudios,
}) {
  return (
    <>
      <h2>Estudios Juridicos Emails: No Enviados</h2>
      <ul>
        {estudiosNoEnviados.map(({ id, nombre }) => (
          <li key={id}>
            {nombre}
            <EnviadoButton id={id} url={url} fetchEstudios={fetchEstudios} />
            <DeleteStudios id={id} />
          </li>
        ))}
      </ul>
    </>
  );
}

EstudiosPendientes.propTypes = {
  estudiosNoEnviados: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  fetchEstudios: PropTypes.any,
};
