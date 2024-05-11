import { useState, useEffect } from "react";
import EstudiosEnviados from "./EstudiosEnviados";
import EstudiosPendientes from "./EstudiosPendientes";

const URL_BACKEND = "http://localhost:1234"; // Cambiar a la URL del servidor backend

const EstudiosJuridicos = () => {
  const [estudiosEnviados, setEstudiosEnviados] = useState([]);
  const [estudiosNoEnviados, setEstudiosNoEnviados] = useState([]);

  useEffect(() => {
    fetchEstudios();
  }, []);

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
    <div>
      <EstudiosEnviados estudiosEnviados={estudiosEnviados} />
      <EstudiosPendientes
        estudiosNoEnviados={estudiosNoEnviados}
        url={URL_BACKEND}
        fetchEstudios={fetchEstudios}
      />
    </div>
  );
};

export default EstudiosJuridicos;
