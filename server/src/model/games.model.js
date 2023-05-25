const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const commentsSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
  stars: {
    type: Number,
    min: [1, "No se puede poner menos de una estrella"],
    max: [5, "Solo se pueden calificar con un maximo de cinco estrellas"],
  },
});

const gamesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "El nombre del juego ya esta en uso"],
  },
  description: { type: String, required: true },
  url: { type: String, required: true },
  maxPlayers: { type: Number, required: true },
  comments: [commentsSchema],
});

gamesSchema.set("toJSON", {
  transform: (_doc, game) => {
    game._id = game._id.toString();
    delete game.__v;
  },
});

const gamesModel = model("games", gamesSchema);

module.exports = { gamesModel, gamesSchema };
