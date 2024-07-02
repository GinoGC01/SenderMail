import { useState, useContext } from "react";
import { StudiosContext } from "../../context/StudiosContext";
import SendMessage from "../Icons/SendMessage";
import Loader01 from "../Icons/Loader01";
import PropTypes from "prop-types";

export default function ButtonSendEmailSubject({ asuntoContent, text }) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEstudios } = useContext(StudiosContext);

  const enviarEmails = async () => {
    const body = {
      subject: "subject default - new page",
      message: "message default",
      asunto: asuntoContent,
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:1234/estudios-juridicos/enviar-emails-subject",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los estudios juridicos");
      }

      const estudios = await response.json();
      if (estudios.ok) {
        fetchEstudios();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Termina la carga
    }
  };

  return (
    <button onClick={enviarEmails} disabled={isLoading} className="button-form">
      {isLoading ? (
        <div className={"loader-01"}>
          <Loader01 />
        </div>
      ) : (
        <div className={"off-loader-01"}>
          Enviar Emails: {text} <SendMessage />
        </div>
      )}
    </button>
  );
}

ButtonSendEmailSubject.propTypes = {
  asuntoContent: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
