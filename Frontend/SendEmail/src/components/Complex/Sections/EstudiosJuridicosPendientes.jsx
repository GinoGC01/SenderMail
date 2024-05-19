import TablaEmailsPendientes from "../TablaEmailsPendientes";
import PropTypes from "prop-types";

export default function EstudiosJuridicosPendientes({ estudiosNoEnviados }) {
  const cantidadEstudiosPendientes = estudiosNoEnviados.length;
  return (
    <section className="tabla-estudios-juridicos">
      <header>
        <h3>
          Estudios jurídicos <strong>PENDIENTES</strong> (
          {cantidadEstudiosPendientes})
        </h3>
      </header>
      <TablaEmailsPendientes estudiosNoEnviados={estudiosNoEnviados} />
    </section>
  );
}

EstudiosJuridicosPendientes.propTypes = {
  estudiosNoEnviados: PropTypes.array.isRequired,
};
