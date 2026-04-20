const express = require("express");
const cors = require("cors");

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
app.use("/servicios", serviciosRoutes);

// 🔹 Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ mensaje: "Ruta no encontrada" });
});

// 🔹 Servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});