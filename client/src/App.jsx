import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [vista, setVista] = useState("home");

  const [servicios, setServicios] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  const [mensajeForm, setMensajeForm] = useState("");
  const [mensajeLogin, setMensajeLogin] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cambiarVista = (v) => {
    setVista(v);
    setMensajeForm("");
    setMensajeLogin("");
  };

  const obtenerServicios = () => {
    fetch("http://localhost:3000/servicios")
      .then(res => res.json())
      .then(data => setServicios(data));
  };

  const obtenerCategorias = () => {
    fetch("http://localhost:3000/categorias")
      .then(res => res.json())
      .then(data => setCategorias(data));
  };

  useEffect(() => {
    obtenerServicios();
    obtenerCategorias();
  }, []);

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMensajeLogin(data.mensaje);
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      setUsername("");
      setPassword("");
      cambiarVista("lista");

    } catch {
      setMensajeLogin("Error al conectar ❌");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    cambiarVista("home");
  };

  const crearServicio = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/servicios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ nombre, descripcion, precio, categoriaId })
    });

    const data = await res.json();

    if (!res.ok) {
      setMensajeForm(data.mensaje);
      return;
    }

    setMensajeForm("Servicio creado ✅");
    obtenerServicios();
    limpiarFormulario();
  };

  const cargarEdicion = (s) => {
    cambiarVista("crear");
    setEditando(true);
    setIdEditar(s.id);
    setNombre(s.nombre);
    setDescripcion(s.descripcion);
    setPrecio(s.precio);
    setCategoriaId(s.categoriaId || "");
  };

  const actualizarServicio = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:3000/servicios/${idEditar}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ nombre, descripcion, precio, categoriaId })
    });

    const data = await res.json();

    if (!res.ok) {
      setMensajeForm(data.mensaje);
      return;
    }

    setMensajeForm("Actualizado ✏️");
    obtenerServicios();
    limpiarFormulario();
  };

  const eliminarServicio = async (id) => {
    if (!window.confirm("¿Eliminar servicio?")) return;

    await fetch(`http://localhost:3000/servicios/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });

    obtenerServicios();
  };

  const limpiarFormulario = () => {
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setCategoriaId("");
    setEditando(false);
  };

  return (
    <div>
      <nav className="navbar">
        <h2>TechSolutions</h2>

        <div>
          <button onClick={() => cambiarVista("home")}>Inicio</button>
          <button onClick={() => cambiarVista("lista")}>Servicios</button>

          {token && (
            <button onClick={() => cambiarVista("crear")}>Registrar</button>
          )}

          {!token ? (
            <button onClick={() => cambiarVista("login")}>Login</button>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </nav>

      <div className="container">

        {/* HOME */}
        {vista === "home" && (
          <div className="hero">
            <h1>Bienvenido a TechSolutions</h1>
            <p>Soluciones tecnológicas profesionales para empresas y personas</p>
          </div>
        )}

        {/* 🔥 LOGIN RESTAURADO */}
        {vista === "login" && (
          <div className="card">
            <h2>Iniciar Sesión</h2>

            {mensajeLogin && <p className="mensaje">{mensajeLogin}</p>}

            <form onSubmit={login}>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">Ingresar</button>
            </form>
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

              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>

              <button
                className="btn-filtro"
                onClick={() => {
                  setBusqueda("");
                  setFiltroCategoria("");
                }}
              >
                Limpiar
              </button>
            </div>

            <div className="grid-servicios">
              {servicios
                .filter(s => {
                  const coincideNombre = s.nombre
                    .toLowerCase()
                    .includes(busqueda.toLowerCase());

                  const coincideCategoria =
                    !filtroCategoria || String(s.categoriaId) === String(filtroCategoria);

                  return coincideNombre && coincideCategoria;
                })
                .map(s => (
                  <div key={s.id} className="servicio-card">
                    <h3>{s.nombre}</h3>
                    <p>{s.descripcion}</p>
                    <span className="precio">S/. {s.precio}</span>

                    {token && (
                      <div className="acciones">
                        <button onClick={() => cargarEdicion(s)}>✏️</button>
                        <button onClick={() => eliminarServicio(s.id)}>❌</button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </>
        )}

        {/* FORM */}
        {vista === "crear" && token && (
          <div className="card">
            <h2>{editando ? "Editar" : "Registrar"} Servicio</h2>

            {mensajeForm && <p className="mensaje">{mensajeForm}</p>}

            <form onSubmit={editando ? actualizarServicio : crearServicio}>
              <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
              <input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" />
              <input value={precio} onChange={e => setPrecio(e.target.value)} placeholder="Precio" />

              <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
                <option value="">Seleccionar categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>

              <button type="submit">{editando ? "Actualizar" : "Guardar"}</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;