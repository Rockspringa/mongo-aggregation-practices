export interface Trivia {
    id?:           number;
    nombreTrivia: string;
    preguntas:    Pregunta[];
}

export interface Pregunta {
    enunciado:         string;
    respuestas:          string[];
    respuestaCorrecta: string;
}