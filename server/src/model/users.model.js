const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const salt = 10;

const { Schema, model } = mongoose;

const playedGamesSchema = new Schema({
  game: { type: String, required: true },
  wins: { type: Number, required: true },
});

const usersSchema = new Schema({
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    unique: [true, "El nombre de usuario ya esta en uso"],
  },
  password: { type: String, required: true },
  student: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  wins: { type: Number, default: 0 },
  playedGames: [playedGamesSchema],
});

usersSchema.set("toJSON", {
  transform: (_doc, user) => {
    user._id = user._id.toString();
    delete user.__v;
  },
});

usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const usersModel = model("users", usersSchema);

module.exports = { usersModel, usersSchema };
