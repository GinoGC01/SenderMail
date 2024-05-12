import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const StudiosContext = createContext();

export function StudiosProvider({ children }) {
  const [estudiosEnviados, setEstudiosEnviados] = useState([]);
  const [estudiosNoEnviados, setEstudiosNoEnviados] = useState([]);
  const URL_BACKEND = "http://localhost:1234";

  const fetchEstudios = async () => {
    try {
      const response = await fetch(`${URL_BACKEND}/estudios-juridicos`);
      if (!response.ok) {
        throw new Error("Error al obtener los estudios juridicos");
      }
      const estudios = await response.json();
      setEstudiosEnviados(estudios.filter((estudio) => estudio.enviado));
      setEstudiosNoEnviados(estudios.filter((estudio) => !estudio.enviado));
    } catch (error) {
      console.error("Error fetching estudios juridicos:", error);
    }
  };

  return (
    <StudiosContext.Provider
      value={{
        estudiosEnviados,
        setEstudiosEnviados,
        estudiosNoEnviados,
        setEstudiosNoEnviados,
        fetchEstudios,
        URL_BACKEND,
      }}
    >
      {children}
    </StudiosContext.Provider>
  );
}

// Validación de propTypes para el componente StudiosProvider → "node": basicamente, puede ser cualquier cosa
StudiosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
