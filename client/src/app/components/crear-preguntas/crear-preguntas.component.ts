import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreguntaService } from '../../game-preguntas/services/pregunta.service';
import {
  Pregunta,
  Trivia,
} from '../../game-preguntas/interfaces/pregunta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css'],
})
export class CrearPreguntasComponent {
  enunciado: string = '';
  nombreTrivia: string = '';
  respuestas: string[] = [];
  respuestaCorrecta: string = '';
  preguntas: Pregunta[] = [];

  @Input() mostrar?: boolean;

  @Output() changeState = new EventEmitter<any>();

  crearPregunta() {
    // Validar si los campos están llenos
    // if (
    //   this.enunciado.trim() === '' ||
    //   this.respuestas[0].trim() === '' ||
    //   this.respuestas[1].trim() === '' ||
    //   this.respuestas[2].trim() === '' ||
    //   this.respuestaCorrecta.trim() === ''
    // ) {
    //   //alert('Por favor, completa todos los campos prer');
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: `Completa todos los campos pregutna `,
    //     timer: 2000,
    //     showConfirmButton: true
    //   });
    //   return;
    // }

    // Crear objeto de pregunta
    const nuevaPregunta: Pregunta = {
      enunciado: this.enunciado,
      respuestas: this.respuestas,
      respuestaCorrecta: this.respuestaCorrecta,
    };

    // Agregar la pregunta al array de preguntas
    this.preguntas.push(nuevaPregunta);

    // Limpiar los campos del formulario
    this.enunciado = '';
    this.respuestas = [];
    this.respuestaCorrecta = '';
    this.changeState.emit({
      preguntas: this.preguntas,
      nombreTrivia: this.nombreTrivia,
    });
  }
}
