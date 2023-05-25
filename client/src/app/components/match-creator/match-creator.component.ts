import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals/globals.service';
import { MatchesService } from 'src/app/services/matches/matches.service';

import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-match-creator',
  templateUrl: './match-creator.component.html',
  styleUrls: ['./match-creator.component.css'],
})
export class MatchCreatorComponent {
  games = [
    'crucigrama',
    'sopa de letras',
    'palabras mezcladas',
    'intriga mental',
  ];
  selectedGame: string = '';
  state: any = {};

  constructor(
    private router: Router,
    private matchesService: MatchesService,
    private globalsService: GlobalsService,
    private toastrService: ToastrService,
  private clipboardService: ClipboardService
  ) {}

  public createMatch() {
    const user = this.globalsService.getUser();

    this.matchesService
      .createMatch(this.selectedGame, user.username, this.state ?? {})
      .subscribe({
        next: (match) => {
          
          this.clipboardService.copyFromContent(match._id !);
          Swal.fire({
            icon: 'success',
            title: `Se creó el juego con éxito.\nEl código del juego es`,
            //timer: 2000,
            html: `<input type="text" value="${match._id}" id="gameCodeInput" style="border: 1px solid black;" >`,
            footer:'El codigo se a copiado en el portapapeles',
            showConfirmButton: true,
          });

          this.router
            .navigateByUrl('/profesor')
            .then(() => this.router.navigateByUrl('/profesor/crear-sala'));
        },
        error: (err) => console.error(err.error),
      });
  }
}
