// import Check from "../Icons/Check";
import { useContext } from "react";
import { StudiosContext } from "../../context/StudiosContext";

export default function TablaEmailsEnviados() {
  const { estudiosEnviados } = useContext(StudiosContext);

  const estudiosPendientes = estudiosEnviados.length;
  return (
    <>
      {estudiosPendientes === 0 ? (
        <p>No hay Emails enviados</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Estudio Jurídico</th>
              {/* <th>Estado</th> */}
              <th>Fecha de Envío</th>
              <th>Asunto</th>
              <th>Mensaje</th>
            </tr>
          </thead>
          <tbody>
            {estudiosEnviados?.map((estudio) => {
              const fechaEnvio = new Date(estudio.fecha_envio);
              const updateFecha = fechaEnvio
                .toISOString()
                .slice(0, 16)
                .replace("T", " ");
              const hora = parseInt(updateFecha.slice(11, 13));
              console.log(estudio);
              return (
                <tr key={estudio.id}>
                  <td>{estudio.nombre}</td>
                  {/* <td>
                    {estudio.enviado === 1 && <Check strokeWidth={2.5} />}
                  </td> */}
                  <td>
                    {updateFecha}
                    {hora > 12 ? " p.m" : " a.m"}
                  </td>
                  <td>{estudio.asunto}</td>
                  <td>{estudio.mensaje}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
