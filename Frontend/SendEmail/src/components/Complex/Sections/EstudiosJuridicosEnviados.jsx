import { useContext } from "react";
import TablaEmailsEnviados from "../TablaEmailsEnviados";
import { StudiosContext } from "../../../context/StudiosContext";
import TablaEmailsContestados from "../TablaEmailsContestados";

// aside
export default function EstudiosJuridicosEnviados() {
  const { estudiosEnviados, estudiosContestados } = useContext(StudiosContext);
  const cantidadEstudiosEnviados = estudiosEnviados.length;
  const cantidadEstudiosContestados = estudiosContestados.length;
  return (
    <aside className="emails-enviados">
      <header>
        <h3>
          Emails Enviados - SIN CONTESTAR: ({" "}
          {cantidadEstudiosEnviados - cantidadEstudiosContestados} )
        </h3>
      </header>
      <TablaEmailsEnviados estudiosEnviados={estudiosEnviados} />
      <section>
        <header>
          <h3> Emails CONTESTADOS: ( {cantidadEstudiosContestados} ) </h3>
        </header>
        <TablaEmailsContestados />
      </section>
    </aside>
  );
}
