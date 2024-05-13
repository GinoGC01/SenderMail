import { useState } from "react";
import EstudiosJuridicos from "./components/EstudiosJuridicos.jsx";
import FormStudios from "./components/FormStudios.jsx";
import "./styles/App.css";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <section className="app">
      <header>
        <h1>S-Email</h1>
        <h3>Dashboard</h3>
      </header>
      <EstudiosJuridicos />
      <button onClick={handleOpen}>
        {open ? "Cerrar" : "Agregar Estudio"}
      </button>
      {open && <FormStudios />}
    </section>
  );
}

export default App;
