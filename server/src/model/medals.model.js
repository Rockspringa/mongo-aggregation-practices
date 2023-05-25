const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const wonBySchema = new Schema({
  username: { type: String, required: true },
  date: { type: Date, default: () => new Date() },
});

const medalsSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "El nombre de la medalla ya esta en uso"],
  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  wonBy: [wonBySchema],
});

medalsSchema.set("toJSON", {
  transform: (_doc, medal) => {
    medal._id = medal._id.toString();
    delete medal.__v;
  },
});

const medaltsModel = model("medals", medalsSchema);

module.exports = { medaltsModel, medalsSchema };
