const mongoose = require('mongoose');

const triviaSchema = new mongoose.Schema({
  
    codigo: {
        type: String,
        required: true,
    },
    nombreTrivia: {
    type: String,
    required: true,
  },
     
  autor: {
    type: String,
    required: true,
  },
  preguntas: [
    {
    
        enunciado: {
        type: String,
        required: true,
      },
      respuestas: {
        type: [String],
        required: true,
      },
      respuestaCorrecta: {
        type: String,
        required: true,
      },
    },
  ],
});

const Trivia = mongoose.model('Trivia', triviaSchema);

module.exports = Trivia;
