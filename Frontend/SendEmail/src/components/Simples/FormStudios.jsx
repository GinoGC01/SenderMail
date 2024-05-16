import useCargarEstudio from "../../hooks/useCargarEstudio";

export default function FormStudios() {
  const { isLoading, handleSubmit } = useCargarEstudio();

  return (
    <section className="cargar-estudio">
      <header>
        <h3>Cargar Estudio Juridico</h3>
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
        <button type="submit">
          {isLoading ? "Cargando estudio..." : "Cargar"}
        </button>
      </form>
    </section>
  );
}
