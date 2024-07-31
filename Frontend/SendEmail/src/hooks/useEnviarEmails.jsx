import { useState, useContext } from "react";
import { StudiosContext } from "../context/StudiosContext";

//hock para enviar emails por tipo de asunto "botones"

export default function useEnviarEmails({ url, typemessage, asuntoContent }) {
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEstudios } = useContext(StudiosContext);

  const enviarEmails = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Comienza la carga

    const body = {
      message: "Mensaje estructurado con HTML - CSS", //mensaje en el sistema
      asunto: asuntoContent, // asunto en el sistema
      typemessage, // tipo de estructura del mensaje
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

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
