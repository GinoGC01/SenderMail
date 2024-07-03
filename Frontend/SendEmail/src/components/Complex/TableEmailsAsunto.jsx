import PropTypes from "prop-types";
import Pending from "../Icons/Pending";

export default function TableEmailsAsunto({ estudiosAsunto }) {
  const estudiosPendientes = estudiosAsunto.length;
  return (
    <>
      {estudiosPendientes === 0 ? (
        <p className="no-estudios-pendientes">No hay estudios pendientes</p>
      ) : (
        <section className="table-pendientes">
          <header>
            <span className="pendiente-nombre">Estudio Juridico</span>
            <span className="pendiente-ubicacion pendiente-header-item">
              Ubicación
            </span>
            <span className="pendiente-email pendiente-header-item">Email</span>
            <span className="pendiente-telefono pendiente-header-item">
              Teléfono
            </span>
            <span className="pendiente-asunto pendiente-header-item">
              Asunto
            </span>
            <span className="pendiente-estado pendiente-header-item">
              Estado
            </span>
          </header>
          <ul className="table-pendientes_container">
            {estudiosAsunto?.map((estudio) => {
              const asunto = () => {
                if (estudio.asunto == "newPage") {
                  return "Crear página";
                }
                if (estudio.asunto == "ImprovePage") {
                  return "Refaccionar página";
                }
              };
              return (
                <li key={estudio.id} className="data-studio">
                  <span className="pendiente-nombre">{estudio.nombre}</span>
                  <span className="pendiente-ubicacion">
                    {estudio.ubicacion}
                  </span>
                  <span className="pendiente-email">{estudio.email}</span>
                  <span className="pendiente-telefono">{estudio.telefono}</span>
                  <span className="pendiente-asunto">{asunto()}</span>
                  <span className="pendiente-estado ">
                    {estudio.enviado === 0 && <Pending />}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}

TableEmailsAsunto.propTypes = {
  estudiosAsunto: PropTypes.array.isRequired,
};
