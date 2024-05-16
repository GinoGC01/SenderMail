import TablaEmailsEnviados from "../TablaEmailsEnviados";
import PropTypes from "prop-types";

export default function EstudiosJuridicosEnviados({ estudiosEnviados }) {
  return (
    <aside className="emails-enviados">
      <header>
        <h3>Emails Enviados</h3>
      </header>
      <TablaEmailsEnviados estudiosEnviados={estudiosEnviados} />
    </aside>
  );
}

EstudiosJuridicosEnviados.propTypes = {
  estudiosEnviados: PropTypes.array.isRequired,
};
