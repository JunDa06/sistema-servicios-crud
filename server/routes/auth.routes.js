const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

const SECRET = "secreto123";

// 🔹 LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ where: { username } });

  if (!user) {
    return res.status(400).json({ mensaje: "Usuario no existe" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).json({ mensaje: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ id: user.id }, SECRET, {
    expiresIn: "1h"
  });

  res.json({ token });
});

module.exports = router;