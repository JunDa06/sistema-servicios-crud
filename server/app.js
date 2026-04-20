const express = require("express");
const app = express();

app.use(express.json());

// 🔹 Ruta inicial
app.get("/", (req, res) => {
  res.send("API de servicios funcionando 🚀");
});

// 🔹 Simulación de base de datos
let servicios = [];

// 🔹 CREAR servicio
app.post("/servicios", (req, res) => {
  const { nombre, descripcion, precio } = req.body;

  // Validar campos vacíos
  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  // Validar duplicados
  const existe = servicios.find(s => s.nombre === nombre);
  if (existe) {
    return res.status(400).json({ mensaje: "El servicio ya existe" });
  }

  const nuevoServicio = {
    id: servicios.length + 1,
    nombre,
    descripcion,
    precio
  };

  servicios.push(nuevoServicio);
  res.status(201).json(nuevoServicio);
});

// 🔹 OBTENER todos los servicios
app.get("/servicios", (req, res) => {
  res.json(servicios);
});

// 🔹 OBTENER un servicio por ID
app.get("/servicios/:id", (req, res) => {
  const { id } = req.params;

  const servicio = servicios.find(s => s.id == id);

  if (!servicio) {
    return res.status(404).json({ mensaje: "Servicio no encontrado" });
  }

  res.json(servicio);
});

// 🔹 ACTUALIZAR servicio
app.put("/servicios/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;

  const servicio = servicios.find(s => s.id == id);

  if (!servicio) {
    return res.status(404).json({ mensaje: "Servicio no encontrado" });
  }

  // Validar duplicados (si cambia el nombre)
  const duplicado = servicios.find(s => s.nombre === nombre && s.id != id);
  if (duplicado) {
    return res.status(400).json({ mensaje: "Ya existe otro servicio con ese nombre" });
  }

  servicio.nombre = nombre;
  servicio.descripcion = descripcion;
  servicio.precio = precio;

  res.json(servicio);
});

// 🔹 ELIMINAR servicio
app.delete("/servicios/:id", (req, res) => {
  const { id } = req.params;

  const index = servicios.findIndex(s => s.id == id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Servicio no encontrado" });
  }

  servicios.splice(index, 1);

  res.json({ mensaje: "Servicio eliminado correctamente" });
});

// 🔹 Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});