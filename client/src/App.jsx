import { useEffect, useState } from "react";
import "./App.css";

function App() {
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
      .catch(() => setMensaje("Error al conectar con el servidor"));
  };

  useEffect(() => {
    obtenerServicios();
  }, []);

  const crearServicio = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/servicios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, descripcion, precio })
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.mensaje);
        return;
      }

      setMensaje("Servicio creado correctamente ✅");
      obtenerServicios();
      setNombre("");
      setDescripcion("");
      setPrecio("");

    } catch {
      setMensaje("Servidor no disponible ❌");
    }
  };

  return (
    <div className="container">
      <h1>Gestión de Servicios</h1>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* BUSCADOR */}
      <div className="card">
        <input
          type="text"
          placeholder="Buscar servicio..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* FORMULARIO */}
      <div className="card">
        <h2>Registrar Servicio</h2>
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

      {/* LISTA */}
      <div className="card">
        <h2>Lista de Servicios</h2>

        {servicios.length === 0 ? (
          <p>No hay servicios registrados</p>
        ) : (
          <ul>
            {servicios
              .filter(s =>
                s.nombre.toLowerCase().includes(busqueda.toLowerCase())
              )
              .map(s => (
                <li key={s.id}>
                  <strong>{s.nombre}</strong> - {s.descripcion} - S/.{s.precio}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;