const { matchesModel } = require("../model/matches.model");

async function findMathces() {
  const matches = await matchesModel.find();

  return matches;
}

/**
 * @param {ObjectId} id
 */
async function findOneMatch(id) {
  const matches = await matchesModel.findById(id);

  return matches;
}

/**
 * @param {string} game
 * @param {string} creator
 * @param {*} state
 */
async function saveMatch(game, creator, state) {
  const match = await matchesModel.create({ game, creator, state });

  return match;
}

/**
 * @param {ObjectId} _id
 * @param {*} state
 */
async function updateOneMatch(_id, state) {
  const updatedMatch = await matchesModel.findByIdAndUpdate(
    _id,
    { state: { ...state } },
    { new: true }
  );

  return updatedMatch;
}

/**
 * @param {ObjectId} _id
 * @param {string} username
 * @param {boolean} guest
 * @param {number} points
 */
async function addPlayer(_id, username, guest, points) {
  const match = await matchesModel.findOneAndUpdate(
    {
      _id,
      players: { $ne: { username, guest, points } },
    },
    { $push: { players: { username, guest, points } } },
    { new: true }
  );

  if (!match) {
    return;
  }

  return match.players.map((player) => player.username);
}

/**
 * @param {ObjectId} _id
 * @param {string} username
 * @param {number} points
 */
async function updatePlayerPoints(_id, username, points) {
  const match = await matchesModel.findOneAndUpdate(
    {
      _id,
      "players.username": username,
    },
    { "players.$.points": points },
    { new: true }
  );

  if (!match) {
    throw new Error("El jugador no existe aun");
  }

  return match.players;
}

/**
 * @param {ObjectId} _id
 * @param {string} username
 * @param {string} content
 */
async function addChatMessage(_id, username, content) {
  const match = await matchesModel.findByIdAndUpdate(
    _id,
    { $push: { chat: { username, content } } },
    { new: true }
  );

  return match.chat;
}

module.exports = {
  findMathces,
  findOneMatch,
  saveMatch,
  updateOneMatch,
  addPlayer,
  updatePlayerPoints,
  addChatMessage,
};
