const { Router } = require("express");
const medalsController = require("../controllers/medals.controller");

const medalsRoutes = Router();

medalsRoutes.get("", medalsController.getAllMedals);
medalsRoutes.get("/:name", medalsController.getMedal);
medalsRoutes.post("", medalsController.createMedal);
medalsRoutes.put("", medalsController.updateMedal);
medalsRoutes.post("/winners", medalsController.addToMedalWinners);

module.exports = { medalsRoutes };
