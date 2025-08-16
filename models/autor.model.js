const { DataTypes } = require('sequelize')
const db = require('../db/db') //Archivo de la base de datos

const Autor = db.define('Autor', {
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    estado: {
        type: DataTypes.TINYINT,
        allowNull: false
    }
}, {
    tableName: 'Autor',
    timestamps: false
})

module.exports = Autor