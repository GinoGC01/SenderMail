// import { useContext, useState } from "react";
// import { StudiosContext } from "../../context/StudiosContext";
import Loader01 from "../Icons/Loader01";
import SendMessage from "../Icons/SendMessage";
import useEnviarEmailsForm from "../../hooks/useEnviarEmailsForm";

export default function EnviarEmailsForm() {
  const { enviarEmails, isLoading } = useEnviarEmailsForm();

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
        <div>
          <label htmlFor="asunto">Enviar (asunto)</label>
          <select name="asunto" id="asunto">
            <option value="newPage">Página nueva</option>
            <option value="ImprovePage">Refaccionar página</option>
          </select>
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
