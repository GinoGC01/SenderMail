import Chart from "react-apexcharts";
import PropTypes from "prop-types";
import useGraficosData from "../../hooks/useGraficosData";
export default function GraficoEnviados({ label }) {
  const { estudios } = useGraficosData();
  //si estudios.enviados === null || undefined → number === 0

  const number = estudios.enviados ?? 0;
  const series = parseFloat(number).toFixed(1);
  const options = {
    chart: {
      height: 280,
      type: "radialBar",
    },
    series: [series],
    colors: ["#18dddd"],
    // plotOptions: Opciones específicas del gráfico radial.
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "65%",
          background: "transparent",
        },
        track: {
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 4,
            opacity: 0.15,
          },
        },
        dataLabels: {
          name: {
            offsetY: -10,
            color: "#fff",
            fontSize: "13px",
          },
          value: {
            color: "#fff",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    // fill: Configuración del relleno.
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        gradientToColors: ["#8F2CFF"],
        stops: [0, 100],
      },
    },
    // stroke: Configuración del borde del gráfico.
    stroke: {
      lineCap: "round",
    },
    labels: [label],
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={options.series}
        type="radialBar"
        height={options.chart.height}
      />
    </div>
  );
}

GraficoEnviados.propTypes = {
  label: PropTypes.string.isRequired,
};
