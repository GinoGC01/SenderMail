import PropTypes from "prop-types";

export default function TablaEmailsPendientes({ estudiosNoEnviados }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Estudio Jurídico</th>
          <th>Ubicación</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {estudiosNoEnviados?.map((estudio) => {
          return (
            <tr key={estudio.id}>
              <td>{estudio.nombre}</td>
              <td>{estudio.ubicacion}</td>
              <td>{estudio.telefono}</td>
              <td>{estudio.email}</td>
              <td>{estudio.enviado === 0 && "Pendiente"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

TablaEmailsPendientes.propTypes = {
  estudiosNoEnviados: PropTypes.array.isRequired,
};
