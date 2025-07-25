const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

// Cadena de conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la DB:', err);
    process.exit(1);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Ruta base para que no se quede vacia
app.get('/', (req, res) => {
  res.send('Hola mundo');
});

// Traer todos los usuarios con consulta raw
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener usuarios' });
    }
    res.json(results);
  });
});

//Agregar un usuario con consulta raw
app.post('/usuarios', (req, res) => {
  const { nombre, correo } = req.body;
  const sql = 'INSERT INTO usuarios (nombre, correo) VALUES (?, ?)';
  db.query(sql, [nombre, correo], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar usuario' });
    }
    res.status(201).json({ id: result.insertId, nombre, correo });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
