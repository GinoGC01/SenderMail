import { useState, useContext } from "react";
import { StudiosContext } from "../context/StudiosContext";
import { EMAILS_ASUNTO } from "../constants/url";

export default function useEnviarEmailsForm(typemessageContent) {
  // Formulario para modificar el mensaje y asunto
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEstudios } = useContext(StudiosContext);

  const enviarEmails = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga

    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);

    const dataBody = { ...fields, typemessage: typemessageContent };

    try {
      const response = await fetch(EMAILS_ASUNTO, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBody),
      });

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
  return { isLoading, enviarEmails };
}
