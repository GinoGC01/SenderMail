import { useContext, useState } from "react";
import { StudiosContext } from "../context/StudiosContext";

export default function useCargarEstudio() {
  const { fetchEstudios } = useContext(StudiosContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:1234/estudios-juridicos/cargar-estudio",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fields),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.codigo || "Error al enviar los datos");
      }

      const data = await response.json();
      if (data.message === "Datos insertados correctamente") {
        fetchEstudios();
        form.reset();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, handleSubmit, error };
}
