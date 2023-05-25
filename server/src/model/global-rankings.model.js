const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const usersSchema = new Schema({
  username: { type: String, required: true },
  points: { type: Number, required: true },
});

const globalRankingsSchema = new Schema({
  game: { type: String, required: true },
  creator: { type: String, required: true },
  finishedAt: { type: Date, default: () => new Date() },
  gameTime: { type: Number, required: true },
  users: [usersSchema],
});

globalRankingsSchema.set("toJSON", {
  transform: (_doc, ranking) => {
    delete ranking.__v;
  },
});

globalRankingsSchema.index({ game: 1 }, { unique: true });

const rankingsModel = model("globalRankings", globalRankingsSchema);

module.exports = { rankingsModel, globalRankingsSchema };
