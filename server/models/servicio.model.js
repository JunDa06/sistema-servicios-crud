const { DataTypes } = require("sequelize");
const sequelize = require("../database");

// 🔹 IMPORTAR CATEGORIA
const Categoria = require("./categoria.model");

const Servicio = sequelize.define("Servicio", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

// 🔹 RELACIONES
Categoria.hasMany(Servicio, {
  foreignKey: "categoriaId"
});

Servicio.belongsTo(Categoria, {
  foreignKey: "categoriaId"
});

module.exports = Servicio;