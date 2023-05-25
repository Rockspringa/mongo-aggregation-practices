const { Router } = require("express");
const usersController = require("../controllers/users.controller");

const usersRoutes = Router();

usersRoutes.get("/:username", usersController.getUser);
usersRoutes.post("/login", usersController.makeLogin);
usersRoutes.post("/create", usersController.makeSignup);
usersRoutes.put("", usersController.updateUser);
usersRoutes.delete("/:username", usersController.deleteUser);
usersRoutes.post("/wins", usersController.addWinner);

module.exports = { usersRoutes };
