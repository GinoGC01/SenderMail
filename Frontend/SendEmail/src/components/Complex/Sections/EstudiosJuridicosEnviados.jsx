import { useContext } from "react";
import TablaEmailsEnviados from "../TablaEmailsEnviados";
import { StudiosContext } from "../../../context/StudiosContext";

export default function EstudiosJuridicosEnviados() {
  const { estudiosEnviados } = useContext(StudiosContext);
  const cantidadEstudiosEnviados = estudiosEnviados.length;
  return (
    <aside className="emails-enviados">
      <header>
        <h3>Emails Enviados ({cantidadEstudiosEnviados})</h3>
      </header>
      <TablaEmailsEnviados estudiosEnviados={estudiosEnviados} />
    </aside>
  );
}
