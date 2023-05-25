import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchComponent } from './components/match/match.component';
import { MatchCreatorComponent } from './components/match-creator/match-creator.component';

import { GameOneComponent } from './game-one/game-one/game-one.component';

//Juegos
import { GameInicioComponent } from './game-one/game-inicio/game-inicio.component';
import { GameRankingComponent } from './game-one/game-ranking/game-ranking.component';
import { GameTwoComponent } from './gameTwo/game-two/game-two.component';
import { GameSopaComponent } from './gameTwo/game-sopa/game-sopa.component';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';

//Login y registro
import { LoginComponent } from './autenticacion/pages/login/login.component';
import { RegistroComponent } from './autenticacion/pages/registro/registro.component';

//Paginas de inicio
import { HomeComponent } from './principal/home/home.component';
import { StudentComponent } from './principal/studentVisual/student/student.component';
import { AdminComponent } from './principal/adminVisual/admin/admin.component';
import { VisualJuegosComponent } from './principal/visual-juegos/visual-juegos.component';
import { NavAdminComponent } from './principal/adminVisual/nav-admin/nav-admin.component';
import { NavStudComponent } from './principal/studentVisual/nav-stud/nav-stud.component';
import { NavGuestComponent } from './principal/guestVisual/nav-guest/nav-guest.component';
import { ListadoGamesComponent } from './principal/listado-games/listado-games.component';
import { GetInMatchComponent } from './components/get-in-match/get-in-match.component';

const routes: Routes = [
  {
    path: '',
    component: NavGuestComponent,
    children: [
      { path: '', component: ListadoGamesComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'ranking/:id', component: GameRankingComponent },
      {
        path: 'jugar',
        children: [
          { path: '', component: GetInMatchComponent },
          { path: ':id', component: MatchComponent },
        ],
      },
    ],
  },
  //{ path: 'dashboard', component: InicioComponent },
  {
    path: 'profesor',
    component: NavAdminComponent,
    children: [
      { path: '', component: AdminComponent },
      { path: 'crear-sala', component: MatchCreatorComponent },
    ],
  },
  {
    path: 'estudiante',
    component: NavStudComponent,
    children: [
      { path: '', component: StudentComponent },
      {
        path: 'jugar',
        children: [
          { path: '', component: GetInMatchComponent },
          { path: ':id', component: MatchComponent },
        ],
      },
    ],
  },
  { path: 'juego', component: GameOneComponent },
  { path: 'inicio', component: GameInicioComponent },
  { path: 'ranking', component: GameRankingComponent },
  { path: 'sopa', component: GameTwoComponent },
  { path: 'playsopa', component: GameSopaComponent },
  { path: 'homeJuegos', component: VisualJuegosComponent },
  //Juego de crear palabras
  { path: 'crear-preguntas', component: CrearPreguntasComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
