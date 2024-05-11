export default function FormStudios() {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const fields = Object.fromEntries(formData);

    try {
      const response = await fetch("http://localhost:1234/estudios-juridicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        throw new Error("Error al enviar los datos");
      }

      const data = await response.json();
      console.log("Datos enviados correctamente:", data);
      // Puedes realizar alguna acción adicional aquí si es necesario
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      // Manejar el error de envío de datos aquí
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input type="text" name="nombre" id="nombre" />
      </div>
      <div>
        <label htmlFor="ubicacion">Ubicacion</label>
        <input type="text" id="ubicacion" name="ubicacion" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
      </div>
      <div>
        <label htmlFor="telefono">Teléfono</label>
        <input type="tel" id="telefono" name="telefono" />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}
