const express = require('express');
require('dotenv').config();
const autorRouter = require('./routes/autor.routes')
const generoRouter = require('./routes/generos.routes')

const app = express();
app.use(express.json());

// Ruta base para que no se quede vacia
app.get('/', (req, res) => {
  const mensaje = {
    base: "Hola mundo",
    codigo: 200,
    clase: "6A_S"
  }
  res.send({mensajeBase: mensaje});
});

//Mandar a traer las rutas de autores
app.use('/', autorRouter)
app.use('/', generoRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
