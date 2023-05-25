import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Trivia } from 'src/app/game-preguntas/interfaces/pregunta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css'],
})
export class PreguntaComponent {
  //@Input('trivia')

  @Input() trivia!: any;

  @Output() winned = new EventEmitter<number>();

  // trivia: Trivia={
  //   codigo:'hola',
  //   autor: 'Soy yo',
  //   nombreTrivia: "pregutnas random",
  //   preguntas:[
  //     {
  //       enunciado: '¿Cuál es la capital de Francia?',
  //       respuestas: ['Paris', 'Londres', 'Madrid', 'Roma'],
  //       respuestaCorrecta: 'Paris'
  //     },
  //     {
  //       enunciado: '¿Cuál es el resultado de 2 + 2?',
  //       respuestas: ['3', '4', '5', '6'],
  //       respuestaCorrecta: '4'
  //     },
  //     {
  //       enunciado: '¿En qué año se fundó la compañía Apple?',
  //       respuestas: ['1976', '1984', '1990', '2001'],
  //       respuestaCorrecta: '1990'
  //     },
  //     {
  //       enunciado: '¿Cuál es el océano más grande del mundo?',
  //       respuestas: ['Atlántico', 'Índico', 'Pacífico', 'Ártico'],
  //       respuestaCorrecta: 'Índico'
  //     },
  //     {
  //       enunciado: '¿Quién escribió el libro "Cien años de soledad"?',
  //       respuestas: [
  //         'Gabriel García Márquez',
  //         'Mario Vargas Llosa',
  //         'Pablo Neruda',
  //         'Jorge Luis Borges',
  //       ],
  //       respuestaCorrecta: 'Gabriel García Márquez'
  //     },
  //     // Resto de las preguntas
  //   ]
  // }
  constructor(private router: Router, private route: ActivatedRoute) {}

  preguntaActual: any;
  preguntaIndex: number = 0;
  tiempoRestante: number = 10;
  intervalo: any;
  finalizado: boolean = false;

  respuestasCorrectas: number = 0;
  puntajeTotal: number = 0;

  // ngOnInit() {
  //   // this.trivia = this.route.snapshot.data.trivia;
  //   // this.trivia = this.route.snapshot.state?.trivia;
  //   console.log(this.trivia);

  //   //this.iniciarPregunta();
  // }
  ngOnInit() {
    const triviaString = this.route.snapshot.paramMap.get('trivia');
    if (triviaString) {
      this.trivia = JSON.parse(triviaString);
      console.log('hola', this.trivia);
      this.iniciarPregunta();
    }
    // Resto del código...
  }

  iniciarPregunta() {
    if (this.finalizado) {
      return;
    }

    this.preguntaActual = this.trivia.preguntas[this.preguntaIndex];
    this.tiempoRestante = 10;

    // Iniciar temporizador
    this.intervalo = setInterval(() => {
      this.tiempoRestante--;
      if (this.tiempoRestante <= 0) {
        clearInterval(this.intervalo);
        this.seleccionarRespuesta(''); // Ejecutar cuando se acabe el tiempo
      }
    }, 1000);
  }

  seleccionarRespuesta(respuesta: string) {
    // Detener el temporizador actual
    clearInterval(this.intervalo);
    // Lógica para verificar si la respuesta es correcta y realizar acciones correspondientes
    if (
      this.trivia.preguntas[this.preguntaIndex].respuestaCorrecta === respuesta
    ) {
      //console.log(respuesta + ' es igual a ' + this.preguntas[this.preguntaIndex].respuestaCorrecta);
      this.respuestasCorrectas++;
      Swal.fire({
        icon: 'success',
        title: 'Respuesta correcta',
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      //console.log(' no es correcta');
      Swal.fire({
        icon: 'error',
        title: 'Respuesta incorrecta',
        text: `La respuesta correcta es: ${
          this.trivia.preguntas[this.preguntaIndex].respuestaCorrecta
        }`,
        timer: 2000,
        showConfirmButton: false,
      });
    }

    // Avanzar a la siguiente pregunta
    this.preguntaIndex++;
    if (this.preguntaIndex < this.trivia.preguntas.length) {
      this.iniciarPregunta();
    } else {
      // Aquí puedes manejar el caso de que no haya más preguntas disponibles
      console.log('No hay más preguntas ', this.calcularPuntaje());
      const score = this.calcularPuntaje();
      this.finalizado = true;
      this.winned.emit(score);
      // this.router.navigate(['/fin-trivia']);
    }
  }

  calcularPuntaje() {
    return (this.respuestasCorrectas / this.trivia.preguntas.length) * 100;
  }

  getColorClass(index: number): string {
    const colors = ['blue', 'yellow', 'red', 'lightblue'];
    return colors[index % colors.length];
  }

  salir() {
    // Redirigir al usuario a la página de inicio o a otra página
    clearInterval(this.intervalo);
    this.router.navigate(['/inicio-preguntas']);
  }
}
