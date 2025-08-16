const AutorModel = require('../models/autor.model')

//Tomar todos los autores
exports.getAutores = async (req, res) => {
    try {
        const autores = await AutorModel.findAll() //Esto es parte del ORM
        res.status(200).json(autores)
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al obtener los autores'
        })
    }
};

//Tomar autor por id
exports.getAutorById = async (req, res) => {
    try {
        const id = req.params.id
        const autor = await AutorModel.findByPk(id)
        if (!autor) {
            return res.status(404).json({
                error: 'Autor no encontrado en la base de datos'
            })
        }
        res.status(200).json(autor)
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al obtener el autor'
        })
    }
}

//Tomar autor por el nombre
exports.getAutorByName = async (req, res) => {
    try {
        const nombre = req.body.nombre
        const autor = await AutorModel.findOne({
            where: {
                nombre: nombre
            }
        })
        if (!autor) {
            return res.status(404).json({
                error: 'Autor no encontrado en la base de datos'
            })
        }
        res.status(200).json(autor)
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al obtener el autor'
        })
    }
}

//Crear nuevo autor
exports.createAutor = async (req, res) => {
    try {
        const { nombre, estado } = req.body;
        const autor = await AutorModel.create({ nombre, estado })
        res.status(201).json(autor)
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al crear el autor'
        })
    }
}

//Actualizar autor
exports.updateAutor = async (req, res) => {
    try {
        const id = req.params.id
        const autor = await AutorModel.findByPk(id)
        if (!autor) {
            return res.status(404).json({
                error: 'Autor no encontrado en la base de datos'
            })
        }

        const { nombre, estado } = req.body
        autor.nombre = nombre
        autor.estado = estado
        await autor.save()
        res.json(autor)
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al actualizar el autor'
        })
    }
}

//Eliminar autor
exports.deleteAutor = async (req, res) => {
    try {
        const id = req.params.id
        const autor = await AutorModel.findByPk(id)
        if (!autor) {
            return res.status(404).json({
                error: 'Autor no encontrado en la base de datos'
            })
        }

        await autor.destroy()
        res.status(200).json({
            message: 'Autor eliminado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Error al eliminar el autor'
        })
    }
}