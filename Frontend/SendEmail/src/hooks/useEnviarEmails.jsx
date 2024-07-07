import { useState, useContext } from "react";
import { StudiosContext } from "../context/StudiosContext";

export default function useEnviarEmails({ url, typemessage, asuntoContent }) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEstudios } = useContext(StudiosContext);

  const enviarEmails = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga

    const body = {
      subject: "TODO: EMAIL SUBJECT",
      message: "Mensaje estructurado con HTML - CSS",
      asunto: asuntoContent,
      typemessage,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      console.log(response);
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
  return { isLoading, enviarEmails };
}
