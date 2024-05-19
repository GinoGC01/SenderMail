import PropTypes from "prop-types";
import Check from "../Icons/Check";

export default function TablaEmailsEnviados({ estudiosEnviados }) {
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
              <th>Email</th>
              <th>Estado</th>
              <th>Fecha de Envío</th>
            </tr>
          </thead>
          <tbody>
            {estudiosEnviados?.map((estudio) => {
              const fechaEnvio = new Date(estudio.fecha_envio);
              const updateFecha = fechaEnvio
                .toISOString()
                .slice(0, 16)
                .replace("T", " ");
              return (
                <tr key={estudio.id}>
                  <td>{estudio.nombre}</td>
                  <td>{estudio.email}</td>
                  <td>
                    {estudio.enviado === 1 && <Check strokeWidth={2.5} />}
                  </td>
                  <td>
                    {updateFecha}
                    {updateFecha > 12 ? " p.m" : " a.m"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

TablaEmailsEnviados.propTypes = {
  estudiosEnviados: PropTypes.array.isRequired,
};
