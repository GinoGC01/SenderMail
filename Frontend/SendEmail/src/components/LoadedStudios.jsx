import { useEffect, useState } from "react";
import DeleteStudios from "./DeleteStudios";

export default function LoadedStudios() {
  const [studios, setStudios] = useState([]);

  async function fetchStudios() {
    try {
      const response = await fetch("http://localhost:1234/");
      // Verificar si la solicitud fue exitosa (código de estado 200)
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      // Convertir la respuesta a formato JSON
      const data = await response.json();

      // Retornar los datos obtenidos
      setStudios(data);
    } catch (error) {
      console.error("Error al obtener los estudios →", error);
      return ["No se pueden recuperar los datos en este momento"];
    }
  }

  useEffect(() => {
    fetchStudios();
  }, []);

  return (
    <ul>
      {studios.length >= 0 &&
        studios.map(({ nombre, id }) => {
          return (
            <li key={id}>
              <h3>{nombre}</h3>
              <DeleteStudios id={id} />
            </li>
          );
        })}
    </ul>
  );
}
