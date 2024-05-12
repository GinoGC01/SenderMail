import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { StudiosContext } from "../context/StudiosContext";

function DeleteStudios({ id }) {
  const { fetchEstudios } = useContext(StudiosContext);
  const [isLoading, setIsLoading] = useState(false);
  async function deleteStudios() {
    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:1234/estudios-juridicos/borrar-studios/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        fetchEstudios();
        console.log("Dato borrado correctamente");
      } else {
        console.error(
          "Error al intentar borrar el dato: FRONTEND",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button onClick={deleteStudios} disabled={isLoading}>
      {isLoading ? "Borrando studio..." : "Borrar estudio"}
    </button>
  );
}

DeleteStudios.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteStudios;
