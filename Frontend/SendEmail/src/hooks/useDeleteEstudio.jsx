import { useContext, useState } from "react";
import { StudiosContext } from "../context/StudiosContext";
import Swal from "sweetalert2";

export default function useDeleteEstudio() {
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const { fetchEstudios } = useContext(StudiosContext);
  const deleteEstudio = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:1234/estudios-juridicos/eliminar-estudio",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.codigo || "Error al enviar los datos");
      }

      fetchEstudios();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const eliminarEstudio = async (id, nombre) => {
    Swal.fire({
      title: "Estas seguro?",
      text: `Se eliminará el estudio jurídico ${nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEstudio(id);
        Swal.fire({
          title: "Eliminado",
          text: `Se elimino ${nombre}`,
          icon: "success",
        });
      }
    });
  };

  return {
    error,
    loading,
    eliminarEstudio,
  };
}
