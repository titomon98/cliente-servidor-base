const { Sequelize } = require('sequelize')

//base de datos, usuario, contraseña
const sequelize = new Sequelize('libros', 'root', 'Jose2598@', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
})

module.exports = sequelize;