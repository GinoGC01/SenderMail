// import Check from "../Icons/Check";
import { useContext, useEffect, useState } from "react";
import { StudiosContext } from "../../context/StudiosContext";
import CardEnviados from "../Simples/CardEnviados";
import useFilters from "../../hooks/useFilters.jsx";
import SearchComponent from "../Simples/SearchComponent.jsx";

export default function TablaEmailsEnviados() {
  const { estudiosEnviados } = useContext(StudiosContext);
  const { contentFiltered, handleOnChangeName, filters } = useFilters({
    content: estudiosEnviados,
  });
  const [estudiosFiltrados, setEstudiosFiltrados] = useState([]);

  useEffect(() => {
    setEstudiosFiltrados(contentFiltered());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, estudiosEnviados]);

  const estudiosPendientes = estudiosEnviados.length;
  return (
    <>
      {estudiosPendientes === 0 ? (
        <p>No hay Emails enviados</p>
      ) : (
        <section className="table-enviados">
          <SearchComponent
            handleChange={handleOnChangeName}
            sectionStudio={"Enviados"}
          />
          <header>
            <span>Estudio Juridico</span>
            <span>Asunto</span>
            <span>Fecha Envio</span>
            <span>estado</span>
          </header>
          <ul className="table-enviados_container">
            {estudiosFiltrados?.map((estudio, index) => {
              const fechaEnvio = new Date(estudio.fecha_envio);
              const updateFecha = fechaEnvio
                .toISOString()
                .slice(0, 16)
                .replace("T", " ");
              const hora = parseInt(updateFecha.slice(11, 13));

              const estado = estudio.contestado == 0 && "sin respuesta";
              if (estudio.contestado == 0) {
                return (
                  <CardEnviados
                    estado={estado}
                    hora={hora}
                    updateFecha={updateFecha}
                    estudio={estudio}
                    index={index}
                    key={index}
                  />
                );
              }
            })}
          </ul>
        </section>
      )}
    </>
  );
}
