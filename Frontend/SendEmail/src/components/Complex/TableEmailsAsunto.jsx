import PropTypes from "prop-types";
import Pending from "../Icons/Pending";

export default function TableEmailsAsunto({ estudiosAsunto }) {
  const estudiosPendientes = estudiosAsunto.length;
  return (
    <>
      {estudiosPendientes === 0 ? (
        <p className="no-estudios-pendientes">No hay estudios pendientes</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Estudio Jurídico</th>
              <th>Ubicación</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Asunto</th>
            </tr>
          </thead>
          <tbody>
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
                <tr key={estudio.id}>
                  <td>{estudio.nombre}</td>
                  <td>{estudio.ubicacion}</td>
                  <td>{estudio.telefono}</td>
                  <td>{estudio.email}</td>
                  <td>{estudio.enviado === 0 && <Pending />}</td>
                  <td>{asunto()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

TableEmailsAsunto.propTypes = {
  estudiosAsunto: PropTypes.array.isRequired,
};
