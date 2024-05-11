import PropTypes from "prop-types";

function DeleteStudios({ id }) {
  async function deleteStudios() {
    try {
      const response = await fetch(
        `http://localhost:1234/estudios-juridicos/borrar-studios/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        console.log("Dato borrado correctamente");
      } else {
        console.error(
          "Error al intentar borrar el dato: FRONTEND",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  }

  return <button onClick={deleteStudios}>Borrar estudio</button>;
}

DeleteStudios.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteStudios;
