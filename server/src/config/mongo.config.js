const mongoose = require("mongoose");

module.exports = {
  configMongoose: function (url) {
    try {
      mongoose.connect(url);
      console.log("connected to MongoDB");
    } catch (error) {
      console.log("error connecting to MongoDB:", error.message);
    }
  },
};
