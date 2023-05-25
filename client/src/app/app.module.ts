import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatchComponent } from './components/match/match.component';
import { CrosswordsModule } from './crosswords/crosswords.module';
import { MatchCreatorComponent } from './components/match-creator/match-creator.component';
import { GameOneComponent } from './game-one/game-one/game-one.component';
import { GameInicioComponent } from './game-one/game-inicio/game-inicio.component';
import { GameRankingComponent } from './game-one/game-ranking/game-ranking.component';
import { GameDataService } from './game-one/game-data.service';
import { NavbarComponent } from './navbar/navbar.component';
import { GameTwoComponent } from './gameTwo/game-two/game-two.component';
import { GameSopaComponent } from './gameTwo/game-sopa/game-sopa.component';

import { LoginComponent } from './autenticacion/pages/login/login.component';
import { RegistroComponent } from './autenticacion/pages/registro/registro.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './principal/home/home.component';
import { MaterialModule } from './material/material.module';
import { ListadoGamesComponent } from './principal/listado-games/listado-games.component';
import { GameTarjetaComponent } from './principal/game-tarjeta/game-tarjeta.component';

import { BarraComponent } from './principal/barra/barra.component';
import { InicioComponent } from './principal/inicio/inicio.component';
import { NavJuegosComponent } from './principal/nav-juegos/nav-juegos.component';
import { AdminComponent } from './principal/adminVisual/admin/admin.component';
import { NavAdminComponent } from './principal/adminVisual/nav-admin/nav-admin.component';
import { StudentComponent } from './principal/studentVisual/student/student.component';
import { NavStudComponent } from './principal/studentVisual/nav-stud/nav-stud.component';
import { VisualJuegosComponent } from './principal/visual-juegos/visual-juegos.component';
import { CommonModule } from '@angular/common';
import { NavGuestComponent } from './principal/guestVisual/nav-guest/nav-guest.component';
import { GetInMatchComponent } from './components/get-in-match/get-in-match.component';
import { PalabrasComponent } from './gameTwo/palabras/palabras.component';
import { PreguntaComponent } from './components/pregunta/pregunta.component';
import { ListadoPreguntasComponent } from './components/listado-preguntas/listado-preguntas.component';
import { CrearPreguntasComponent } from './components/crear-preguntas/crear-preguntas.component';
import { InicioPreguntasComponent } from './components/inicio-preguntas/inicio-preguntas.component';

import { ToastrModule } from 'ngx-toastr';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent,
    MatchCreatorComponent,
    GameOneComponent,
    GameInicioComponent,
    GameRankingComponent,
    NavbarComponent,
    GameTwoComponent,
    GameSopaComponent,
    PalabrasComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    ListadoGamesComponent,
    GameTarjetaComponent,
    BarraComponent,
    BarraComponent,
    InicioComponent,
    NavJuegosComponent,
    AdminComponent,
    NavAdminComponent,
    StudentComponent,
    NavStudComponent,
    VisualJuegosComponent,
    NavGuestComponent,
    GetInMatchComponent,
    PalabrasComponent,
    PreguntaComponent,
    ListadoPreguntasComponent,
    CrearPreguntasComponent,
    InicioPreguntasComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    CrosswordsModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ClipboardModule
  ],
  providers: [GameDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
