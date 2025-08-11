const mysql = require('mysql2');

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

module.exports = db;