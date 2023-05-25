const { Router } = require("express");
const matchesController = require("../controllers/matches.controller");

const matchesRoutes = Router();

matchesRoutes.get("", matchesController.getAllMatches);
matchesRoutes.get("/:_id", matchesController.getMatch);
matchesRoutes.get("/:_id/error", matchesController.getMatchError);
matchesRoutes.get("/:_id/state", matchesController.getMatch);
matchesRoutes.post("", matchesController.createMatch);
matchesRoutes.put("", matchesController.updateMatch);
matchesRoutes.post("/players", matchesController.addPlayerToTheMatch);
matchesRoutes.put("/players", matchesController.changePlayerPoints);
matchesRoutes.post("/message", matchesController.postChatMessage);

module.exports = { matchesRoutes };
