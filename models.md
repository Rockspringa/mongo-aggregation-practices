# Modelos

## User

```
{
  name: string,
  username: string, // unique
  password: string,
  student?: boolean, // si no va se settea a true
  wins?: number,
  deleted?: boolean,
  playedGames?: [
    {
      game: string,
      wins: number,
    }
  ]
}
```

## Medals

```
{
  name: string,
  description: string,
  image: string,
  wonBy?: [
    {
      username: string,
      date: date,
    }
  ],
}
```

## Games

```
{
  name: string,
  description: string,
  image: FormData, // debe de ir como formdata, no se guarda en mongo
  url: string, // se generara asi que no se envia
  maxPlayers: number,
  comments?: [
    {
      username: string,
      content: string,
      createdAt: date,
      stars: number,
    } // estructura de los objetos en el array
  ]
}
```

## Matches

```
{
  game: string,
  creator: string,
  createdAt: date, // se generara solo, no se envia
  gameTime?: number,
  players?: [
    {
      username: string, // tendria unique
      guest: boolean, // si no va se pone como true
      points: number, // si no va se pone como 0
    } // estructura de los objetos en el array
  ]
  chat?: [
    {
      username: string,
      content: string,
      createdAt: date, // se generara solo, no se envia
    } // estructura de los objetos en el array
  ]
  state?: object, // toda la informacion del juego especifico, ejemplo:
      crucigrama: palabras usadas en el juego, posicion de las palabras,
        palabras sin seleccionar, palabras seleccionadas, etc.
}
```

## Rankings

```
{ // no tiene rutas porque me queria ahorrar el tiempo en lo que miraba como se iba a utilizar
  game: string,
  creator: string,
  finishedAt: date,
  gameTime: number,
  users: [
    {
      username: string,
      points: number,
    }
  ],
}
```
