import ButtonEmailAsunto from "./ButtonEmailAsunto.jsx";
import PropTypes from "prop-types";

export default function ButtonsEmailsAsunto({
  handlerEstudiosAll,
  handlerEstudiosImprovePage,
  handlerEstudiosNewPage,
}) {
  return (
    <section className="buttons-emailsAsuntos_conteiner">
      <ButtonEmailAsunto
        handler={handlerEstudiosNewPage}
        text="Estudios - página nueva"
      />
      <ButtonEmailAsunto
        handler={handlerEstudiosImprovePage}
        text="Estudios - refaccionar página"
      />
      <ButtonEmailAsunto handler={handlerEstudiosAll} text="Estudios - todos" />
    </section>
  );
}

ButtonsEmailsAsunto.propTypes = {
  handlerEstudiosAll: PropTypes.func,
  handlerEstudiosImprovePage: PropTypes.func,
  handlerEstudiosNewPage: PropTypes.func,
};
