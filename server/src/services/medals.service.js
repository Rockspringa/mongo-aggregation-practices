const { medaltsModel } = require("../model/medals.model");

async function findMedals() {
  const medals = await medaltsModel.find();

  return medals;
}

/**
 * @param {string} name
 */
async function findOneMedal(name) {
  const medal = await medaltsModel.findOne({ name });

  return medal;
}

/**
 * @param {string} name
 * @param {string} description
 * @param {string} image
 */
async function saveMedal(name, description, image) {
  await medaltsModel.create({ name, description, image });

  return true;
}

/**
 * @param {{
 *   name: string;
 *   description: string?;
 *   image: string?;
 * }} medal
 */
async function updateOneMedal(medal) {
  const name = medal.name;
  const updatedMedal = await medaltsModel.findOneAndUpdate(
    { name },
    { ...medal, name: undefined, wonBy: undefined },
    { new: true }
  );

  return updatedMedal;
}

/**
 * @param {string} name
 * @param {string} username
 */
async function addMedalWinner(name, username) {
  const medal = await medaltsModel.findOneAndUpdate(
    {
      name,
      "wonBy.username": { $ne: username },
    },
    { $push: { wonBy: { username } } },
    { new: true }
  );

  return !!medal;
}

module.exports = {
  findMedals,
  findOneMedal,
  saveMedal,
  updateOneMedal,
  addMedalWinner,
};
