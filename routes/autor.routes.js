const express = require('express');
const db = require('../db/db') //Ir a traer la base de datos

//Nueva variable
const router = express.Router()

//CRUD de autores

// Traer todos los autores con consulta raw
router.get('/autores', (req, res) => {
  db.query('SELECT * FROM autor', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener autores' });
    }
    res.json(results);
  });
});


//Agregar un autor con consulta raw
router.post('/autores', (req, res) => {
  const { nombre, estado } = req.body;
  const sql = 'INSERT INTO autor (nombre, estado) VALUES (?, ?)';
  db.query(sql, [nombre, estado], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al insertar autor' });
    }
    res.status(201).json({ id: result.insertId, nombre, estado });
  });
});

//Actualizacion de un autor con consulta raw
router.put('/autores/:id', (req, res) => {
  const id = req.params.id
  const { nombre, estado } = req.body;
  const sql = 'UPDATE autor set nombre = ?, estado = ? where id = ?'
  try {
    db.query(sql, [nombre, estado, id], (err, result) => {
      if (err) {
      return res.status(500).json({ error: 'Error al actualizar autor' + err });
    }
      res.status(200).json({ mensaje: "Actualizado", resultado: result });
    })
  } catch (error) {
    console.error("Error al actualizar registro: " + error)
  }
})

// Traer a todos los autores por el id
router.get('/autores/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM Autores WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener autor' });
    }
    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    res.json(results[0]);
  });
});

// Traer todos los autores con estado = 1
router.get('/autores/estado/:estado', (req, res) => {
  const estado = req.params.estado;
  const sql = 'SELECT * FROM Autores WHERE estado = ?';
  db.query(sql, [estado], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener autores por estado' });
    }
    res.json(results);
  });
});

// Delete de un registro por medio del id
router.delete('/autores/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM Autores WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar autor' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Autor no encontrado' });
    }
    res.status(200).json({ mensaje: 'Autor eliminado correctamente' });
  });
});

module.exports = router