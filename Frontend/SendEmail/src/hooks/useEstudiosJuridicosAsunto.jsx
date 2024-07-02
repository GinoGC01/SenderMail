import { useState, useEffect, useContext } from "react";
import { arraysEqual } from "../utils/arraysEqual.js";
import { StudiosContext } from "../context/StudiosContext.jsx";

export default function useEstudiosJuridicosAsunto() {
  const { estudiosNoEnviados } = useContext(StudiosContext);
  const estudiosNewPage = estudiosNoEnviados.filter(
    (estudio) => estudio.asunto == "newPage"
  );
  const estudiosImprovePage = estudiosNoEnviados.filter(
    (estudio) => estudio.asunto == "ImprovePage"
  );

  const [estudiosAsunto, setEstudiosAsunto] = useState([]);
  const [title, setTitle] = useState("");
  const [cantidad, setCantidad] = useState("");

  useEffect(() => {
    handlerTitle();
    setCantidad(estudiosAsunto.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estudiosAsunto]);

  useEffect(() => {
    setEstudiosAsunto(estudiosNoEnviados);
  }, [estudiosNoEnviados]);

  const handlerTitle = () => {
    // Compara los contenidos de los arrays, no las referencias
    if (arraysEqual(estudiosAsunto, estudiosNewPage)) {
      setTitle("Nueva página");
    } else if (arraysEqual(estudiosAsunto, estudiosImprovePage)) {
      setTitle("Refaccionar Página");
    } else {
      setTitle("Todos");
    }
  };

  const handlerEstudiosNewPage = () => {
    setEstudiosAsunto(estudiosNewPage);
  };

  const handlerEstudiosImprovePage = () => {
    setEstudiosAsunto(estudiosImprovePage);
  };

  const handlerEstudiosAll = () => {
    setEstudiosAsunto(estudiosNoEnviados);
  };

  return {
    title,
    cantidad,
    estudiosAsunto,
    handlerEstudiosAll,
    handlerEstudiosNewPage,
    handlerEstudiosImprovePage,
  };
}
