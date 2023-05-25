const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const playersSchema = new Schema({
  username: { type: String, required: true },
  guest: { type: Boolean, default: true },
  points: { type: Number, default: 0 },
});

const chatsSchema = new Schema({
  username: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

const matchesSchema = new Schema({
  game: { type: String, required: true },
  creator: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
  gameTime: { type: Number },
  state: { type: Schema.Types.Mixed },
  players: [playersSchema],
  chat: [chatsSchema],
});

matchesSchema.set("toJSON", {
  transform: (_doc, match) => {
    match._id = match._id.toString();
    delete match.__v;
  },
});

const matchesModel = model("matches", matchesSchema);

module.exports = { matchesModel, matchesSchema };
