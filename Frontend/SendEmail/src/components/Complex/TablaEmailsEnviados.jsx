// import Check from "../Icons/Check";
import { useContext } from "react";
import { StudiosContext } from "../../context/StudiosContext";
import CardEnviados from "../Simples/CardEnviados";

export default function TablaEmailsEnviados() {
  const { estudiosEnviados } = useContext(StudiosContext);

  const estudiosPendientes = estudiosEnviados.length;
  return (
    <>
      {estudiosPendientes === 0 ? (
        <p>No hay Emails enviados</p>
      ) : (
        <section className="table-enviados">
          <header>
            <span>Estudio Juridico</span>
            <span>Asunto</span>
            <span>Fecha Envio</span>
            <span>estado</span>
          </header>
          <ul className="table-enviados_container">
            {estudiosEnviados?.map((estudio, index) => {
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
