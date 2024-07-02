import TableEmailsAsunto from "../TableEmailsAsunto";
import useEstudiosJuridicosAsunto from "../../../hooks/useEstudiosJuridicosAsunto.jsx";
import ButtonsEmailsAsunto from "../../Simples/ButtonsEmailsAsunto.jsx";

export default function EstudiosJuridicosAsunto() {
  const {
    title,
    cantidad,
    estudiosAsunto,
    handlerEstudiosAll,
    handlerEstudiosImprovePage,
    handlerEstudiosNewPage,
  } = useEstudiosJuridicosAsunto();

  return (
    <section className="tabla-estudios-juridicos">
      <header>
        <h3>
          Estudios jurídicos <strong>ASUNTO:</strong> {title}{" "}
          <strong>({cantidad})</strong>
        </h3>
        <ButtonsEmailsAsunto
          handlerEstudiosAll={handlerEstudiosAll}
          handlerEstudiosImprovePage={handlerEstudiosImprovePage}
          handlerEstudiosNewPage={handlerEstudiosNewPage}
        />
      </header>
      <TableEmailsAsunto estudiosAsunto={estudiosAsunto} />
    </section>
  );
}
