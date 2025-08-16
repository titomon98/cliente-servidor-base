const express = require('express');
require('dotenv').config();

const sequelize = require('./db/db')
const autorRoutes = require('./routes/autor.routes')
const AutorModel = require('./models/autor.model')

const app = express()
app.use(express.json())

//Maquetar las rutas
app.use('/', autorRoutes)

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Base de datos conectada')
  })
}).catch(err => {
  console.error('Error al conectar la base de datos', err)
})