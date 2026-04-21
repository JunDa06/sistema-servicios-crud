const express = require("express");
const router = express.Router();
const Categoria = require("../models/categoria.model");

// 🔹 Crear categoría
router.post("/", async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al crear categoría" });
  }
});

// 🔹 Obtener todas
router.get("/", async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

module.exports = router;

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Categoria.update(req.body, {
      where: { id }
    });

    res.json({ mensaje: "Categoría actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
});