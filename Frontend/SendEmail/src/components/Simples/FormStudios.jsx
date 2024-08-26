import useCargarEstudio from "../../hooks/useCargarEstudio";
import Loader01 from "../Icons/Loader01";
import UploadStudio from "../Icons/UploadStudio";

export default function FormStudios() {
  const { isLoading, handleSubmit, error } = useCargarEstudio();

  return (
    <section className="cargar-estudio">
      <header>
        <h3>Cargar Estudio Juridico</h3>
        <p>
          {error === "dato-existente" &&
            "Se ingresó un dato ya existente. Por favor revise los campos antes de seguir."}
        </p>
        <p>
          {error === "caracteres-no-soportados" &&
            "Se ingresaron caracteres no soportados. Revisar los campos."}
        </p>
      </header>
      <form onSubmit={handleSubmit} className="cargar-estudio-form">
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" name="nombre" id="nombre" />
        </div>
        <div>
          <label htmlFor="ubicacion">Ubicación</label>
          <input type="text" id="ubicacion" name="ubicacion" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input type="tel" id="telefono" name="telefono" />
        </div>
        <div>
          <label htmlFor="asunto">Asunto</label>
          <select id="asunto" name="asunto">
            <option value="newPage">Página Nueva</option>
            <option value="ImprovePage">Refaccionar Página</option>
          </select>
        </div>
        <button type="submit" className="button-form">
          {isLoading ? (
            <div className="loader-01">
              <Loader01 />
            </div>
          ) : (
            <>
              Cargar Estudio <UploadStudio />
            </>
          )}
        </button>
      </form>
    </section>
  );
}
