import { useEffect, useContext } from "react";
import EstudiosEnviados from "./EstudiosEnviados";
import EstudiosPendientes from "./EstudiosPendientes";
import { StudiosContext } from "../context/StudiosContext";

const EstudiosJuridicos = () => {
  const { estudiosEnviados, estudiosNoEnviados, fetchEstudios, URL_BACKEND } =
    useContext(StudiosContext);

  useEffect(() => {
    fetchEstudios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
