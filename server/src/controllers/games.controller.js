const {
  findGames,
  saveGame,
  updateOneGame,
  addGameReviews,
} = require("../services/games.service");
const { dirname } = require("path");
const { nanoid } = require("nanoid");

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getAllGames(req, res) {
  const games = await findGames();

  if (games) {
    res.json(games);
  } else {
    res.json([]);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getGameInfo(req, res) {
  const { name: gameName } = req.params;

  if (!gameName) {
    return res.status(400).send("Se debe de enviar un nombre de un juego");
  }

  const game = await findOneMedal(gameName);

  if (game) {
    res.json(game);
  } else {
    res.status(404).send(`No se encontro el juego ${gameName}`);
  }
}

/**
  /**
   * @param {Request} req
   * @param {Response} res
   */
async function createGame(req, res) {
  const { name: gameName, description, image, maxPlayers } = req.body;

  if (!gameName || !description || !image || !maxPlayers) {
    return res
      .status(400)
      .send(
        "Se debe de enviar el nombre, descripcion, imagen " +
          "url y el maximo de jugadores obligatoriamente"
      );
  }

  if (/^image/.test(image.mimetype)) {
    return res.sendStatus(400);
  }

  const rootDir = dirname(require.main?.filename);
  const imageName = nanoid();
  const imageUrl = `${rootDir}/public/images/${imageName}`;

  await saveGame(gameName, description, image, imageUrl, maxPlayers);

  image.mv(imageUrl);

  res.status(201);
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateGame(req, res) {
  const game = req.body;

  if (!game?.name) {
    return res
      .status(400)
      .send("Se debe de mandar un objeto juego con el nombre del juego");
  }

  const newGame = await updateOneGame(game);

  if (newGame) {
    res.json(newGame);
  } else {
    res.status(404).send("El juego no se encontro");
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function reviewGame(req, res) {
  const { name: gameName, username, content, stars } = req.body;

  if (!gameName || !username || !content || !stars) {
    return res
      .status(400)
      .send(
        "Se debe de mandar un objeto con el nombre del juego, " +
          "el nombre del usuario, contenido de la reseña y " +
          "las estrellas"
      );
  }

  await addGameReviews(gameName, username, content, stars);

  res.status(201).send("Se agrego el comentario del juego");
}

module.exports = {
  getAllGames,
  getGameInfo,
  createGame,
  updateGame,
  reviewGame,
};
