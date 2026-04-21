const express = require("express");
const cors = require("cors");
const sequelize = require("./database");
const bcrypt = require("bcryptjs");

const app = express();

// 🔹 MODELO USER
const User = require("./models/user.model");

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Ruta base
app.get("/", (req, res) => {
  res.send("API de servicios funcionando 🚀");
});

// 🔹 Rutas
const serviciosRoutes = require("./routes/servicios.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/servicios", serviciosRoutes);
app.use("/auth", authRoutes);

// 🔹 Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// 🔹 Puerto
const PORT = 3000;

// 🔥 Conectar BD + CREAR USUARIO ADMIN
sequelize.sync()
  .then(async () => {
    console.log("Base de datos conectada 🟢");

    try {
      const existe = await User.findOne({ where: { username: "admin" } });

      if (!existe) {
        const hashedPassword = await bcrypt.hash("1234", 10);

        await User.create({
          username: "admin",
          password: hashedPassword
        });

        console.log("Usuario admin creado 🔐");
      } else {
        console.log("El usuario admin ya existe");
      }

    } catch (error) {
      console.error("Error con User:", error);
    }

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar la base de datos ❌", error);
  });