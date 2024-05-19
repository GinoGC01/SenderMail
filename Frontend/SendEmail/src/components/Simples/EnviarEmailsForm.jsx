import { useContext, useState } from "react";
import { StudiosContext } from "../../context/StudiosContext";
import Loader01 from "../Icons/Loader01";
import SendMessage from "../Icons/SendMessage";

export default function EnviarEmailsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEstudios } = useContext(StudiosContext);

  const enviarEmails = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga

    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);

    try {
      const response = await fetch(
        "http://localhost:1234/estudios-juridicos/enviar-emails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fields),
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los estudios juridicos");
      }

      const estudios = await response.json();
      if (estudios.ok) {
        form.reset();
        fetchEstudios();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Termina la carga
    }
  };

  return (
    <section className="enviar-email">
      <header>
        <h3>Personalizar mensaje</h3>
      </header>
      <form onSubmit={enviarEmails} className="enviar-email-form">
        <div>
          <label htmlFor="subject">asunto</label>
          <input type="text" name="subject" id="subject" />
        </div>
        <div>
          <label htmlFor="message">mensaje</label>
          <textarea name="message" id="message" />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="loader-01">
              <Loader01 />
            </div>
          ) : (
            <>
              Enviar Emails <SendMessage />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
