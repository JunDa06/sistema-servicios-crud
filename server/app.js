const express = require("express");
const cors = require("cors");
const sequelize = require("./database");

const serviciosRoutes = require("./routes/servicios.routes");
const authRoutes = require("./routes/auth.routes");

const User = require("./models/user.model");
const bcrypt = require("bcryptjs");

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Ruta base
app.get("/", (req, res) => {
  res.send("API de servicios funcionando 🚀");
});

// 🔹 Rutas
app.use("/servicios", serviciosRoutes);
app.use("/auth", authRoutes);

// 🔹 Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// 🔹 Puerto
const PORT = 3000;

// 🔥 Conexión a BD + crear usuario + levantar servidor
sequelize.sync().then(async () => {
  console.log("Base de datos conectada 🟢");

  try {
    // 🔐 Crear usuario admin si no existe
    const existe = await User.findOne({ where: { username: "admin" } });

    if (!existe) {
      const passwordHash = await bcrypt.hash("1234", 10);

      await User.create({
        username: "admin",
        password: passwordHash
      });

      console.log("Usuario admin creado ✔");
    }

  } catch (error) {
    console.error("Error creando usuario admin ❌", error);
  }

  // 🚀 Iniciar servidor
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });

}).catch((error) => {
  console.error("Error al conectar la base de datos ❌", error);
});