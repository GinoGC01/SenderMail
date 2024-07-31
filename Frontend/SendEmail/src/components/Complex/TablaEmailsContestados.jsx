import { useContext } from "react";
import { StudiosContext } from "../../context/StudiosContext";
import Check from "../Icons/Check";
import useOpenComponent from "../../hooks/useOpenComponent";
import Delete from "../Icons/Delete";
import useDeleteEstudio from "../../hooks/useDeleteEstudio";

export default function TablaEmailsContestados() {
  const { estudiosContestados } = useContext(StudiosContext);
  const { open, handleOpen } = useOpenComponent();
  const { eliminarEstudio } = useDeleteEstudio();

  const estudiosPendientes = estudiosContestados.length;
  return (
    <>
      {estudiosPendientes === 0 ? (
        <p className="no-emails">No hay Emails contestados</p>
      ) : (
        <section className="table-enviados">
          <header>
            <span>Estudio Juridico</span>
            <span>Asunto</span>
            <span>Respuesta</span>
            <span>valorado</span>
          </header>
          <ul className="table-enviados_container">
            {estudiosContestados?.map((estudio, index) => {
              return (
                <>
                  <li
                    key={estudio.id}
                    className={
                      index % 2 == 0 ? "data-studio" : "data-studio  no-bg"
                    }
                    onClick={handleOpen}
                  >
                    <span>{estudio.nombre}</span>
                    <span>{estudio.asunto}</span>
                    <span>{estudio.contestado == 1 && <Check />}</span>
                    <span>{estudio.valorado} / 10</span>
                  </li>
                  {open && (
                    <button
                      className="delete-contestados"
                      onClick={() => {
                        eliminarEstudio(estudio.id, estudio.nombre);
                      }}
                    >
                      <Delete />
                    </button>
                  )}
                </>
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
}
