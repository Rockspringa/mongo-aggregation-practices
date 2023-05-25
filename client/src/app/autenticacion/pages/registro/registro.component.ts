import { Component } from '@angular/core';
import { AutenticationService } from '../../autentication.service';
import { User } from '../../user/user.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
 user: User = {
    name: '',
    username: '',
    password: '',
    student: false,
    wins: 0,
    playedGames: []
  };
  
  constructor(private autenticationService: AutenticationService, private router: Router) { }

  guardarUsuario() {
    this.autenticationService.signup(this.user)
      .subscribe(
        response => {
          console.log('Usuario registrado correctamente', response);
          alert('Usuario registrado');
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado',
            timer: 2000,
            showConfirmButton: false,
          });
          this.router.navigate(['/login']);
          // Realiza cualquier acción adicional después de registrar el usuario, como redireccionar a otra página
        },
        error => {
          console.error('Error al registrar usuario', error);
          // Maneja el error de registro de usuario, muestra un mensaje de error, etc.
        }
      );
  }

}
