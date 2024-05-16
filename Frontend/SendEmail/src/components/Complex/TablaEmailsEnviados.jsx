import PropTypes from "prop-types";

export default function TablaEmailsEnviados({ estudiosEnviados }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Estudio Jurídico</th>
          <th>Email</th>
          <th>Estado</th>
          <th>Hora de Envío</th>
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
              <td>{estudio.enviado === 1 && "Enviado"}</td>
              <td>{updateFecha}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TablaEmailsEnviados.propTypes = {
  estudiosEnviados: PropTypes.array.isRequired,
};
