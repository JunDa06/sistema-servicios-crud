const express = require("express");
const router = express.Router();
const Servicio = require("../models/servicio.model");

// 🔹 CREAR servicio
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    if (!nombre || !descripcion || !precio) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    const existe = await Servicio.findOne({ where: { nombre } });

    if (existe) {
      return res.status(400).json({ mensaje: "El servicio ya existe" });
    }

    const nuevoServicio = await Servicio.create({
      nombre,
      descripcion,
      precio
    });

    res.status(201).json(nuevoServicio);

  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear servicio" });
  }
});

// 🔹 OBTENER todos
router.get("/", async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.json(servicios);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener servicios" });
  }
});

// 🔹 OBTENER por ID
router.get("/:id", async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    res.json(servicio);
  } catch {
    res.status(500).json({ mensaje: "Error al obtener servicio" });
  }
});

// 🔹 ACTUALIZAR
router.put("/:id", async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    const duplicado = await Servicio.findOne({
      where: { nombre }
    });

    if (duplicado && duplicado.id !== servicio.id) {
      return res.status(400).json({
        mensaje: "Ya existe otro servicio con ese nombre"
      });
    }

    await servicio.update({
      nombre,
      descripcion,
      precio
    });

    res.json(servicio);

  } catch {
    res.status(500).json({ mensaje: "Error al actualizar servicio" });
  }
});

// 🔹 ELIMINAR
router.delete("/:id", async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    await servicio.destroy();

    res.json({ mensaje: "Servicio eliminado correctamente" });

  } catch {
    res.status(500).json({ mensaje: "Error al eliminar servicio" });
  }
});

module.exports = router;