import TablaEmailsPendientes from "../TablaEmailsPendientes";
import PropTypes from "prop-types";

export default function EstudiosJuridicosPendientes({ estudiosNoEnviados }) {
  return (
    <section className="tabla-estudios-juridicos">
      <header>
        <h3>Estudios jurídicos pendientes</h3>
      </header>
      <TablaEmailsPendientes estudiosNoEnviados={estudiosNoEnviados} />
    </section>
  );
}

EstudiosJuridicosPendientes.propTypes = {
  estudiosNoEnviados: PropTypes.array.isRequired,
};
