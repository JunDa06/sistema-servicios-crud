const { DataTypes } = require("sequelize");
const sequelize = require("../database");

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

module.exports = Servicio;