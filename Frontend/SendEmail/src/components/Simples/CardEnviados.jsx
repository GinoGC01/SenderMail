/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import useOpenComponent from "../../hooks/useOpenComponent";
import { StudiosContext } from "../../context/StudiosContext";
import Loader01 from "../Icons/Loader01";
import Delete from "../Icons/Delete.jsx";
import useDeleteEstudio from "../../hooks/useDeleteEstudio";

export default function CardEnviados({
  estudio,
  index,
  updateFecha,
  hora,
  estado,
}) {
  const [constestado, setContestado] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEstudios } = useContext(StudiosContext);

  const handlerContestado = () => {
    setContestado(!constestado);
  };

  const { open, handleOpen } = useOpenComponent();
  const { eliminarEstudio } = useDeleteEstudio();

  const handleSubmitAnswered = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);
    const dataBody = { ...fields, id: estudio.id };
    console.log(dataBody);
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:1234/estudios-juridicos/actualizar-estado-contestado",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.codigo || "Error al enviar los datos");
      }

      const data = await response.json();
      if (data.state) {
        fetchEstudios();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li
      className={
        index % 2 == 0
          ? "data-studio data-enviados"
          : "data-studio data-enviados  no-bg"
      }
    >
      <div className="data-studio-important" onClick={handleOpen}>
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
          <button
            className="delete-enviado"
            onClick={() => {
              eliminarEstudio(estudio.id, estudio.nombre);
            }}
          >
            <Delete />
          </button>
          <button onClick={handlerContestado}>contestado</button>
          {constestado && (
            <form className="valorado" onSubmit={handleSubmitAnswered}>
              <div className="valorado-input">
                <label htmlFor="valorado">Agregar valoracion</label>
                <select name="valorado" id="valorado" autoFocus>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => {
                    return (
                      <option value={number} key={number}>
                        {" "}
                        {number}
                      </option>
                    );
                  })}
                </select>
              </div>
              <button type="submit">
                {isLoading ? (
                  <div className="loader-01">
                    <Loader01 />
                  </div>
                ) : (
                  "Enviar"
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </li>
  );
}
