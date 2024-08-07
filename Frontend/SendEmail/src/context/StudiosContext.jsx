import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const StudiosContext = createContext();

export function StudiosProvider({ children }) {
  const [estudiosEnviados, setEstudiosEnviados] = useState([]);
  const [estudiosNoEnviados, setEstudiosNoEnviados] = useState([]);
  const [estudiosContestados, setEstudiosContestados] = useState([]);

  const [totalEstudios, setTotalEstudios] = useState([]);
  const URL_BACKEND = "http://localhost:1234/estudios-juridicos";

  const fetchEstudios = async () => {
    try {
      const response = await fetch(URL_BACKEND);
      if (!response.ok) {
        throw new Error("Error al obtener los estudios juridicos");
      }
      const estudios = await response.json();
      setTotalEstudios(estudios);
      setEstudiosEnviados(estudios.filter((estudio) => estudio.enviado));
      setEstudiosNoEnviados(estudios.filter((estudio) => !estudio.enviado));
      setEstudiosContestados(estudios.filter((estudio) => estudio.contestado));
    } catch (error) {
      if (error.status == null) return;
      console.error("Error fetching estudios juridicos:", error);
    }
  };

  useEffect(() => {
    fetchEstudios();
  }, []);

  return (
    <StudiosContext.Provider
      value={{
        estudiosEnviados,
        estudiosNoEnviados,
        estudiosContestados,

        totalEstudios,
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
