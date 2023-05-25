const express = require('express');
const triviaController = require('../controllers/trivia.controller');

const router = express.Router();

// Ruta para agregar una nueva trivia
router.post('/', triviaController.agregarTrivia);

// Ruta para obtener una trivia por su ID
router.get('/:id', triviaController.obtenerTriviaPorId);

// Ruta para obtener trivias por autor
router.get('/autor/:autor', triviaController.obtenerTriviasPorAutor);

router.get('/codigo/:codigo', triviaController.obtenerTriviasPorCodigo);

module.exports = router;
