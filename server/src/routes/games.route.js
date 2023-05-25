const { Router } = require("express");
const gamesController = require("../controllers/games.controller");

const gamesRoutes = Router();

gamesRoutes.get("", gamesController.getAllGames);
gamesRoutes.get("/:game", gamesController.getGameInfo);
gamesRoutes.post("", gamesController.createGame);
gamesRoutes.put("", gamesController.updateGame);
gamesRoutes.post("/review", gamesController.reviewGame);

module.exports = { gamesRoutes };
