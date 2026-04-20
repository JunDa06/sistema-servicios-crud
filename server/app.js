const express = require("express");
const cors = require("cors");
const sequelize = require("./database");

const app = express();

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

// 🔥 Conectar BD y levantar servidor
sequelize.sync()
  .then(() => {
    console.log("Base de datos conectada 🟢");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar la base de datos ❌", error);
  });