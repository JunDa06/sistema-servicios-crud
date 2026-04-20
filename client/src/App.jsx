import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [vista, setVista] = useState("home");

  const [servicios, setServicios] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [mensaje, setMensaje] = useState("");

  const obtenerServicios = () => {
    fetch("http://localhost:3000/servicios")
      .then(res => res.json())
      .then(data => setServicios(data))
      .catch(() => console.error("Error"));
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  const crearServicio = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/servicios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion, precio })
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.mensaje);
        setTimeout(() => setMensaje(""), 3000);
        return;
      }

      setMensaje("Servicio creado correctamente ✅");
      setTimeout(() => setMensaje(""), 3000);

      obtenerServicios();

      setNombre("");
      setDescripcion("");
      setPrecio("");

    } catch {
      setMensaje("Servidor no disponible ❌");
      setTimeout(() => setMensaje(""), 3000);
    }
  };

  // 🔴 ELIMINAR SERVICIO
  const eliminarServicio = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este servicio?");

    if (!confirmar) return;

    try {
      await fetch(`http://localhost:3000/servicios/${id}`, {
        method: "DELETE"
      });

      obtenerServicios();
    } catch {
      alert("Error al eliminar ❌");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h2>TechSolutions</h2>
        <div>
          <button onClick={() => setVista("home")}>Inicio</button>
          <button onClick={() => setVista("lista")}>Servicios</button>
          <button onClick={() => setVista("crear")}>Registrar</button>
        </div>
      </nav>

      <div className="container">

        {/* PORTADA */}
        {vista === "home" && (
          <div className="hero">
            <h1>Bienvenido a TechSolutions</h1>
            <p>Soluciones tecnológicas rápidas y profesionales</p>
            <button onClick={() => setVista("lista")}>
              Explorar Servicios
            </button>
          </div>
        )}

        {/* LISTA */}
        {vista === "lista" && (
          <>
            <div className="card">
              <input
                type="text"
                placeholder="Buscar servicio..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="grid-servicios">
              {servicios
                .filter(s =>
                  s.nombre.toLowerCase().includes(busqueda.toLowerCase())
                )
                .map(s => (
                  <div key={s.id} className="servicio-card">

                    {/* ❌ BOTÓN ELIMINAR */}
                    <button
                      className="btn-eliminar"
                      onClick={() => eliminarServicio(s.id)}
                    >
                      ✖
                    </button>

                    <h3>{s.nombre}</h3>
                    <p>{s.descripcion}</p>
                    <span className="precio">S/. {s.precio}</span>
                  </div>
                ))}
            </div>
          </>
        )}

        {/* CREAR */}
        {vista === "crear" && (
          <div className="card">
            <h2>Registrar Servicio</h2>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <form onSubmit={crearServicio}>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              <input
                type="number"
                placeholder="Precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
              <button type="submit">Guardar</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;