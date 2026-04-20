const express = require("express");
const router = express.Router();

const Servicio = require("../models/servicio.model");
const verificarToken = require("../middlewares/auth");

// 🔹 CREAR servicio (PROTEGIDO)
router.post("/", verificarToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    // Validar campos
    if (!nombre || !descripcion || !precio) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Validar precio numérico
    if (isNaN(precio)) {
      return res.status(400).json({ mensaje: "El precio debe ser un número" });
    }

    // Validar duplicado
    const existe = await Servicio.findOne({ where: { nombre } });

    if (existe) {
      return res.status(400).json({ mensaje: "El servicio ya existe" });
    }

    const nuevoServicio = await Servicio.create({
      nombre,
      descripcion,
      precio: Number(precio)
    });

    res.status(201).json(nuevoServicio);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear servicio" });
  }
});

// 🔹 OBTENER todos (PÚBLICO)
router.get("/", async (req, res) => {
  try {
    const servicios = await Servicio.findAll();
    res.json(servicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener servicios" });
  }
});

// 🔹 OBTENER por ID (PÚBLICO)
router.get("/:id", async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    res.json(servicio);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener servicio" });
  }
});

// 🔹 ACTUALIZAR (PROTEGIDO)
router.put("/:id", verificarToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    if (!nombre || !descripcion || !precio) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    if (isNaN(precio)) {
      return res.status(400).json({ mensaje: "El precio debe ser un número" });
    }

    // Validar duplicado
    const duplicado = await Servicio.findOne({ where: { nombre } });

    if (duplicado && duplicado.id !== servicio.id) {
      return res.status(400).json({
        mensaje: "Ya existe otro servicio con ese nombre"
      });
    }

    await servicio.update({
      nombre,
      descripcion,
      precio: Number(precio)
    });

    res.json(servicio);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar servicio" });
  }
});

// 🔹 ELIMINAR (PROTEGIDO)
router.delete("/:id", verificarToken, async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    await servicio.destroy();

    res.json({ mensaje: "Servicio eliminado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar servicio" });
  }
});

module.exports = router;