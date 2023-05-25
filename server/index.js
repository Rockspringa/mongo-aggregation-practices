const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const config = require("dotenv").config;

const { configMongoose } = require("./src/config/mongo.config");
const { morganConfig } = require("./src/config/morgan.config");
const { errorsMiddleware } = require("./src/middleware/errors.middleware");

const { gamesRoutes } = require("./src/routes/games.route");
const { matchesRoutes } = require("./src/routes/matches.route");
const { medalsRoutes } = require("./src/routes/medals.route");
const { usersRoutes } = require("./src/routes/users.route");
const { publicRoutes } = require("./src/routes/public.route");

const triviaRoutes = require('./src/routes/trivia.route');

const app = express();

config();

// configuracion de mongoose
const url = process.env.MONGODB_URI || "url";
configMongoose(url);

// agregado de configuraciones como middleware
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(morganConfig());

// agregado de rutas
app.use("/games", gamesRoutes);
app.use("/matches", matchesRoutes);
app.use("/medals", medalsRoutes);
app.use("/users", usersRoutes);
app.use("/public", publicRoutes);
app.use('/trivia', triviaRoutes);

// agregado de middlewares
app.use(errorsMiddleware);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Puerto funcionando');
});
