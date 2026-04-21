const express = require("express");
const router = express.Router();

const Servicio = require("../models/servicio.model");
const Categoria = require("../models/categoria.model");
const verificarToken = require("../middlewares/auth");

// 🔹 CREAR servicio (PROTEGIDO)
router.post("/", verificarToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoriaId } = req.body;

    // 🔥 normalizar nombre
    const nombreLower = nombre?.toLowerCase().trim();

    // Validar campos
    if (!nombreLower || !descripcion || !precio || !categoriaId) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Validar precio
    if (isNaN(precio)) {
      return res.status(400).json({ mensaje: "El precio debe ser un número" });
    }

    // 🔥 Validar duplicado (case-insensitive)
    const existe = await Servicio.findOne({
      where: { nombre: nombreLower }
    });

    if (existe) {
      return res.status(400).json({ mensaje: "El servicio ya existe" });
    }

    const nuevoServicio = await Servicio.create({
      nombre: nombreLower,
      descripcion,
      precio: Number(precio),
      categoriaId
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
    const servicios = await Servicio.findAll({
      include: {
        model: Categoria,
        attributes: ["id", "nombre"]
      }
    });

    res.json(servicios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener servicios" });
  }
});

// 🔹 OBTENER por ID
router.get("/:id", async (req, res) => {
  try {
    const servicio = await Servicio.findByPk(req.params.id, {
      include: {
        model: Categoria,
        attributes: ["id", "nombre"]
      }
    });

    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    res.json(servicio);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener servicio" });
  }
});

// 🔹 ACTUALIZAR
router.put("/:id", verificarToken, async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoriaId } = req.body;

    const servicio = await Servicio.findByPk(req.params.id);

    if (!servicio) {
      return res.status(404).json({ mensaje: "Servicio no encontrado" });
    }

    const nombreLower = nombre?.toLowerCase().trim();

    if (!nombreLower || !descripcion || !precio || !categoriaId) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    if (isNaN(precio)) {
      return res.status(400).json({ mensaje: "El precio debe ser un número" });
    }

    // 🔥 Validar duplicado
    const duplicado = await Servicio.findOne({
      where: { nombre: nombreLower }
    });

    if (duplicado && duplicado.id !== servicio.id) {
      return res.status(400).json({
        mensaje: "Ya existe otro servicio con ese nombre"
      });
    }

    await servicio.update({
      nombre: nombreLower,
      descripcion,
      precio: Number(precio),
      categoriaId
    });

    res.json(servicio);

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar servicio" });
  }
});

// 🔹 ELIMINAR
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