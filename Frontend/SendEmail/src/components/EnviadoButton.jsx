import PropTypes from "prop-types";

export default function EnviadoButton({ id, url, fetchEstudios }) {
  const handleMarcarEnviado = async () => {
    try {
      const response = await fetch(`${url}/estudios-juridicos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ enviado: true }),
      });
      if (!response.ok) {
        throw new Error("Error al marcar el estudio como enviado");
      }
      fetchEstudios();
    } catch (error) {
      console.error("Error marcando estudio como enviado:", error);
    }
  };
  return <button onClick={handleMarcarEnviado}>Marcar enviado</button>;
}

EnviadoButton.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  fetchEstudios: PropTypes.any,
};
