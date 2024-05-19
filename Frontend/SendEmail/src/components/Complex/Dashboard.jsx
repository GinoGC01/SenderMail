import { useContext, useEffect } from "react";
import FormStudios from "../Simples/FormStudios.jsx";
import EnviarEmailsForm from "../Simples/EnviarEmailsForm.jsx";
import { StudiosContext } from "../../context/StudiosContext";
import EstudiosJuridicosPendientes from "./Sections/EstudiosJuridicosPendientes.jsx";
import Graficos from "./Sections/Graficos.jsx";
import useOpenComponent from "../../hooks/useOpenComponent.jsx";
import Footer from "../Simples/Footer.jsx";
import EstudiosJuridicosEnviados from "./Sections/EstudiosJuridicosEnviados.jsx";
import ButtonSendEmail from "../Simples/ButtonSendEmail.jsx";
import UploadStudio from "../Icons/UploadStudio.jsx";
import PersonalizeMessage from "../Icons/PersonalizeMessage.jsx";
import Funcionalidades from "../Icons/Funcionalidades.jsx";

export default function Dashboard() {
  const { estudiosEnviados, fetchEstudios, estudiosNoEnviados } =
    useContext(StudiosContext);

  const cargasStudios = useOpenComponent();
  const enviarEmails = useOpenComponent();

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
          <li className="button-send-emails-DEFAULT">
            <ButtonSendEmail />
          </li>
        </ul>
      </section>
      <section className="data">
        <header>
          <h3>
            Información y funcioanlidades <Funcionalidades />
          </h3>
        </header>
        <EstudiosJuridicosPendientes estudiosNoEnviados={estudiosNoEnviados} />
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
      <EstudiosJuridicosEnviados estudiosEnviados={estudiosEnviados} />
      <Footer />
    </section>
  );
}
