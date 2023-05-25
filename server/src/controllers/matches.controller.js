const {
  findMathces,
  findOneMatch,
  saveMatch,
  updateOneMatch,
  addPlayer,
  addChatMessage,
  updatePlayerPoints,
} = require("../services/matches.service");
const mongoose = require("mongoose");
const { findOneUser } = require("../services/users.service");

function getObjectId(id) {
  if (typeof id === "string") {
    return new mongoose.Types.ObjectId(id);
  }
  return id;
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getAllMatches(req, res) {
  const matches = await findMathces();

  if (matches) {
    res.json(matches);
  } else {
    res.json([]);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getMatch(req, res) {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).send("Se debe de enviar el id de la partida");
  }

  const match = await findOneMatch(getObjectId(_id));

  if (match) {
    res.json(match);
  } else {
    res.status(404).send(`No se encontro la partida ${_id}`);
  }
}


async function getMatchError(req, res) {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res.status(400).send("Se debe de enviar el id de la partida");
    }

    const match = await findOneMatch(getObjectId(_id));

    if (match) {
      res.json(match);
    } else {
      res.status(404).send(`No se encontro la partida ${_id}`);
    }
  } catch (error) {
    console.error("Error al obtener el partido:", error);
    res.status(500).send("Ocurrió un error en el servidor");
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getMatchState(req, res) {
  const { _id } = req.params;

  if (!_id) {
    return res.status(400).send("Se debe de enviar el id de la partida");
  }

  const match = await findOneMatch(getObjectId(_id));

  if (match?.state) {
    res.json(match.state);
  } else {
    res.status(404).send(`No se encontro la partida ${_id}`);
  }
}

/**
    /**
     * @param {Request} req
     * @param {Response} res
     */
async function createMatch(req, res) {
  const { game, creator, state } = req.body;

  if (!game || !creator) {
    return res
      .status(400)
      .send(
        "Se debe de enviar el nombre del juego y " +
          "el nombre del creador obligatoriamente"
      );
  }

  const user = await findOneUser(creator);

  if (!user || user.student) {
    return res
      .status(400)
      .send("Se debe de enviar el nombre de usuario de un profesor");
  }

  const match = await saveMatch(game, creator, state);

  res.json(match);
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateMatch(req, res) {
  const { _id, state } = req.body;

  const id = getObjectId(_id);

  if (!id || !state) {
    return res
      .status(400)
      .send("Se debe de mandar un objeto con el id de la partida y el estado");
  }

  const newMatch = await updateOneMatch(id, state);

  if (newMatch) {
    res.json(newMatch);
  } else {
    res.status(404).send("La partida no se encontro");
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function addPlayerToTheMatch(req, res) {
  const { _id, username, guest, points } = req.body;

  const id = getObjectId(_id);

  if (!id || !username) {
    return res
      .status(400)
      .send(
        "Se debe de mandar un objeto con el id de la partida " +
          "y el nombre del usuario "
      );
  }

  if (guest === false) {
    const user = await findOneUser(username);

    if (!user?.student) {
      return res
        .status(400)
        .send("El usuario no invitado debe de existir y ser estudiante");
    }
  }

  await addPlayer(id, username, guest, points);

  res.status(201).send("Se agrego al usuario al juego en curso");
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function changePlayerPoints(req, res) {
  const { _id, username, points } = req.body;

  const id = getObjectId(_id);

  if (!id || !username || isNaN(points ?? undefined)) {
    return res
      .status(400)
      .send(
        "Se debe de mandar un objeto con el id de la partida " +
          "y el nombre del usuario "
      );
  }

  await updatePlayerPoints(id, username, points);

  res.status(201).send("Se agrego al usuario al juego en curso");
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function postChatMessage(req, res) {
  const { _id, username, content } = req.body;

  const id = getObjectId(_id);

  if (!id || !username || !content) {
    return res
      .status(400)
      .send(
        "Se debe de mandar un objeto con el id de la partida, " +
          "el contenido del mensaje y el nombre del usuario"
      );
  }

  await addChatMessage(id, username, content);

  res.status(201).send("Se agrego el mensaje al chat del juego en curso");
}

module.exports = {
  getAllMatches,
  getMatch,
  getMatchState,
  createMatch,
  updateMatch,
  addPlayerToTheMatch,
  changePlayerPoints,
  postChatMessage,
  getMatchError,
};
