const express = require("express");
const router = express.Router();

// 🔹 Simulación de base de datos
let servicios = [];
let contadorId = 1;

// 🔹 CREAR servicio
router.post("/", (req, res) => {
  const { nombre, descripcion, precio } = req.body;

  // Validar campos
  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  // Validar precio numérico
  if (isNaN(precio)) {
    return res.status(400).json({ mensaje: "El precio debe ser un número" });
  }

  // Validar duplicados
  const existe = servicios.find(s => s.nombre === nombre);
  if (existe) {
    return res.status(400).json({ mensaje: "El servicio ya existe" });
  }

  const nuevoServicio = {
    id: contadorId++, // 🔥 evita duplicados
    nombre,
    descripcion,
    precio: Number(precio)
  };

  servicios.push(nuevoServicio);
  res.status(201).json(nuevoServicio);
});

// 🔹 OBTENER todos los servicios
router.get("/", (req, res) => {
  res.json(servicios);
});

// 🔹 OBTENER servicio por ID
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const servicio = servicios.find(s => s.id == id);

  if (!servicio) {
    return res.status(404).json({ mensaje: "Servicio no encontrado" });
  }

  res.json(servicio);
});

// 🔹 ACTUALIZAR servicio
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio } = req.body;

  const servicio = servicios.find(s => s.id == id);

  if (!servicio) {
    return res.status(404).json({ mensaje: "Servicio no encontrado" });
  }

  // Validar campos
  if (!nombre || !descripcion || !precio) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  // Validar precio
  if (isNaN(precio)) {
    return res.status(400).json({ mensaje: "El precio debe ser un número" });
  }

  // Validar duplicados
  const duplicado = servicios.find(
    s => s.nombre === nombre && s.id != id
  );

  if (duplicado) {
    return res.status(400).json({
      mensaje: "Ya existe otro servicio con ese nombre"
    });
  }

  servicio.nombre = nombre;
  servicio.descripcion = descripcion;
  servicio.precio = Number(precio);

  res.json(servicio);
});

// 🔹 ELIMINAR servicio
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = servicios.findIndex(s => s.id == id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Servicio no encontrado" });
  }

  servicios.splice(index, 1);

  res.json({ mensaje: "Servicio eliminado correctamente" });
});

module.exports = router;