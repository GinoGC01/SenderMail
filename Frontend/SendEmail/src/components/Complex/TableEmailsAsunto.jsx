import PropTypes from "prop-types";
import Pending from "../Icons/Pending";
import useDeleteEstudio from "../../hooks/useDeleteEstudio";
import Delete from "../Icons/Delete";
import SearchComponent from "../Simples/SearchComponent";
import useFilters from "../../hooks/useFilters";
import { useEffect, useState } from "react";

export default function TableEmailsAsunto({ estudiosAsunto }) {
  const [estudiosPendientes, setEstudiosPendientes] = useState([]);
  const estudiosPendientesLen = estudiosAsunto.length;
  const { eliminarEstudio, error } = useDeleteEstudio();
  const { handleOnChangeName, filters, contentFiltered } = useFilters({
    content: estudiosAsunto,
  });

  useEffect(() => {
    setEstudiosPendientes(contentFiltered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, estudiosAsunto]);
  return (
    <>
      {estudiosPendientesLen === 0 ? (
        <p className="no-estudios-pendientes">No hay estudios pendientes</p>
      ) : (
        <section className="table-pendientes">
          <SearchComponent
            handleChange={handleOnChangeName}
            sectionStudio={"Pendientes"}
          />
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
            <span className="pendiente-estado pendiente-header-item">
              Eliminar
            </span>
          </header>
          <ul className="table-pendientes_container">
            {estudiosPendientes?.map((estudio) => {
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
                  <button
                    className="pendiente-delte"
                    onClick={() => {
                      eliminarEstudio(estudio.id, estudio.nombre);
                    }}
                  >
                    <Delete />
                  </button>
                </li>
              );
            })}
          </ul>
          <span>{error}</span>
        </section>
      )}
    </>
  );
}

TableEmailsAsunto.propTypes = {
  estudiosAsunto: PropTypes.array.isRequired,
};
