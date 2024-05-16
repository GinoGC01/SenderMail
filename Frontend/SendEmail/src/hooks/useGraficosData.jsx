import { useState, useContext, useEffect } from "react";
import { StudiosContext } from "../context/StudiosContext";
export default function useGraficosData() {
  const { totalEstudios, estudiosEnviados, estudiosNoEnviados } =
    useContext(StudiosContext);
  const [estudios, setEstudios] = useState([]);

  useEffect(() => {
    function estudiosValues() {
      const estudios = totalEstudios.length;
      if (estudios === 0) {
        const estudiosEnviadosGrafico = 0;
        const estudiosNOEnviadosGrafico = 0;
        setEstudios({
          total: estudios,
          enviados: estudiosEnviadosGrafico,
          pendientes: estudiosNOEnviadosGrafico,
        });
        return;
      } else {
        const emailsEnviadoValue = estudiosEnviados.length;
        const estudiosEnviadosGrafico = (emailsEnviadoValue / estudios) * 100;
        const emailsNOEnviadosValue = estudiosNoEnviados.length;
        const estudiosNOEnviadosGrafico =
          (emailsNOEnviadosValue / estudios) * 100;
        setEstudios({
          total: estudios,
          enviados: estudiosEnviadosGrafico,
          pendientes: estudiosNOEnviadosGrafico,
        });
      }
    }
    estudiosValues();
  }, [totalEstudios.length, estudiosEnviados, estudiosNoEnviados.length]);

  return { estudios };
}
