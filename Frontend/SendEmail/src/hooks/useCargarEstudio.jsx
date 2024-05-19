import { useContext, useState } from "react";
import { StudiosContext } from "../context/StudiosContext";

export default function useCargarEstudio() {
  const { fetchEstudios } = useContext(StudiosContext);
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);
    setIsLoading(true);

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
        throw new Error("Error al enviar los datos");
      }

      const data = await response.json();
      if (data.message === "Datos insertados correctamente") {
        fetchEstudios();
        form.reset(); // Restablecer el formulario después de un envío exitoso
      }
      // Puedes realizar alguna acción adicional aquí si es necesario
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Manejar el error de envío de datos aquí
    } finally {
      setIsLoading(false);
    }
  }
  return { isLoading, handleSubmit };
}
