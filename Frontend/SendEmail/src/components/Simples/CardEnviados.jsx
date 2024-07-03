/* eslint-disable react/prop-types */
import useOpenComponent from "../../hooks/useOpenComponent";

export default function CardEnviados({
  estudio,
  index,
  updateFecha,
  hora,
  estado,
}) {
  const { open, handleOpen } = useOpenComponent();

  return (
    <li
      className={
        index % 2 == 0
          ? "data-studio data-enviados"
          : "data-studio data-enviados  no-bg"
      }
      onClick={handleOpen}
    >
      <div className="data-studio-important">
        <span>{estudio.nombre}</span>
        <span>{estudio.asunto}</span>
        <span>
          {updateFecha}
          {hora > 12 ? " p.m" : " a.m"}
        </span>
        <span>{estado}</span>
      </div>
      {open && (
        <div className="data-studio-details">
          <div className="data-studio-details__mensaje">
            Mensaje: {estudio.mensaje}
          </div>
          <button>contestado</button>
        </div>
      )}
    </li>
  );
}
