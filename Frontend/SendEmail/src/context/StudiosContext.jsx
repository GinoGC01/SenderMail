import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const StudiosContext = createContext();

export function StudiosProvider({ children }) {
  const [studios, setStudios] = useState([]);
  const [studiosUpdate, setStudiosUpdate] = useState([]);

  return (
    <StudiosContext.Provider
      value={{ studios, setStudios, studiosUpdate, setStudiosUpdate }}
    >
      {children}
    </StudiosContext.Provider>
  );
}

// Validación de propTypes para el componente StudiosProvider → "node": basicamente, puede ser cualquier cosa
StudiosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
