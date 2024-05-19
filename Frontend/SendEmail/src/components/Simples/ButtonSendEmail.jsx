import { useState, useContext } from "react";
import { StudiosContext } from "../../context/StudiosContext";
import SendMessage from "../Icons/SendMessage";
import Loader01 from "../Icons/Loader01";

export default function ButtonSendEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEstudios } = useContext(StudiosContext);

  const enviarEmails = async () => {
    setIsLoading(true); // Activar carga
    const body = {
      subject: "subject default",
      message: "message default",
    };

    try {
      const response = await fetch(
        "http://localhost:1234/estudios-juridicos/enviar-emails",
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
          Enviar Emails <SendMessage />
        </div>
      )}
    </button>
  );
}
