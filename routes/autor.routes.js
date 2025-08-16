//vamos a declarar solo las rutas
const express = require('express')
const router = express.Router()
const autorController = require('../controllers/autor.controller')

router.get('/autores', autorController.getAutores)
router.get('/autores/:id', autorController.getAutorById)
router.get('/autores/nombre', autorController.getAutorByName)
router.post('/autores', autorController.createAutor)
router.put('/autores/:id', autorController.updateAutor)
router.delete('/autores/:id', autorController.deleteAutor)

module.exports = router