import DeleteStudios from "./DeleteStudiosButton";
import PropTypes from "prop-types";
import EnviarEmailsForm from "./EnviarEmailsForm";

export default function EstudiosPendientes({ estudiosNoEnviados }) {
  return (
    <>
      <h2>Estudios Juridicos Emails: No Enviados</h2>
      <EnviarEmailsForm />
      <ul>
        {estudiosNoEnviados.map(({ id, nombre, email }) => (
          <li key={id}>
            {nombre}
            {email}
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
