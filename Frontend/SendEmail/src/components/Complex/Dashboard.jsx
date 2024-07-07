import { useContext, useEffect } from "react";
import FormStudios from "../Simples/FormStudios.jsx";
import EnviarEmailsForm from "../Simples/EnviarEmailsForm.jsx";
import { StudiosContext } from "../../context/StudiosContext";
import Graficos from "./Sections/Graficos.jsx";
import useOpenComponent from "../../hooks/useOpenComponent.jsx";
import Footer from "../Simples/Footer.jsx";
import EstudiosJuridicosEnviados from "./Sections/EstudiosJuridicosEnviados.jsx";
// import ButtonSendEmail from "../Simples/ButtonSendEmail.jsx";
import UploadStudio from "../Icons/UploadStudio.jsx";
import PersonalizeMessage from "../Icons/PersonalizeMessage.jsx";
import Funcionalidades from "../Icons/Funcionalidades.jsx";
import EstudiosJuridicosAsunto from "./Sections/EstudiosJuridicosAsunto.jsx";
import ButtonSendEmailSubject from "../Simples/ButtonSendEmailSubject.jsx";
import { PAGINA_NUEVA, REFACCIONAR_PAGINA } from "../../constants/asuntos.js";
import { EMAILS_ASUNTO } from "../../constants/url.js";
import { FORMATO_HTML } from "../../constants/format.js";

export default function Dashboard() {
  const { fetchEstudios, estudiosNoEnviados } = useContext(StudiosContext);

  const cargasStudios = useOpenComponent();
  const enviarEmails = useOpenComponent();

  const estudiosNewPage = estudiosNoEnviados.filter(
    (estudio) => estudio.asunto == "newPage"
  );
  const estudiosImprovePage = estudiosNoEnviados.filter(
    (estudio) => estudio.asunto == "ImprovePage"
  );

  // fetch de los estudios juridicos
  useEffect(() => {
    fetchEstudios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="dashboard">
      <header className="title-principal">
        <h1>S-Email</h1>
        <h2>DASHBOARD</h2>
      </header>
      <section className="utils">
        <header>
          <h3>Funcionalidades</h3>
        </header>
        <ul>
          <li className="utils-li">
            <button onClick={cargasStudios.handleOpen}>
              Cargar estudio <UploadStudio />
            </button>
          </li>
          <li className="utils-li">
            <button onClick={enviarEmails.handleOpen}>
              Mod. mensaje <PersonalizeMessage />
            </button>
          </li>
          <li
            className={
              estudiosNoEnviados.length > 0
                ? "button-send-emails-DEFAULT"
                : "button-send-emails-DEFAULT-disabled"
            }
          >
            <span>Enviar segun asunto: </span>
            {/* <ButtonSendEmail /> envia emails a todos los correos registrados*/}
            {estudiosNewPage.length > 0 && (
              <ButtonSendEmailSubject
                asuntoContent={PAGINA_NUEVA}
                text="Página nueva"
                typemessage={FORMATO_HTML}
                url={EMAILS_ASUNTO}
              />
            )}
            {estudiosImprovePage.length > 0 && (
              <ButtonSendEmailSubject
                asuntoContent={REFACCIONAR_PAGINA}
                text="Refactorizar Página"
                typemessage={FORMATO_HTML}
                url={EMAILS_ASUNTO}
              />
            )}
          </li>
        </ul>
      </section>
      <section className="data">
        <header>
          <h3>
            Información y funcioanlidades <Funcionalidades />
          </h3>
        </header>
        <EstudiosJuridicosAsunto />
        <Graficos />
        <section className="funcionalidades">
          <header>
            <h3>funcionalidades</h3>
          </header>
          <div className="formularios">
            {cargasStudios.open && <FormStudios />}
            {enviarEmails.open && <EnviarEmailsForm />}
          </div>
        </section>
      </section>
      <EstudiosJuridicosEnviados />
      <Footer />
    </section>
  );
}
