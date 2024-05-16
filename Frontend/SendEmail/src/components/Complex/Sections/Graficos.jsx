import GraficoEnviados from "../../Graphics/GraficoEnviados";
import GraficoPendientes from "../../Graphics/GraficoPendientes";
import useGraficosData from "../../../hooks/useGraficosData";

export default function Graficos() {
  const { estudios } = useGraficosData();

  return (
    <section className="graficos">
      <header>
        <h3>Gráficos</h3>
      </header>
      <h3>Estudios jurídicos cargados</h3>
      <span>{estudios.total}</span>
      <div className="graficos-emails">
        <div className="graficos-enviados">
          <GraficoEnviados label="Emails Enviados" />
        </div>
        <div className="graficos-pendientes">
          <GraficoPendientes label="Emails Pendientes" />
        </div>
      </div>
    </section>
  );
}
