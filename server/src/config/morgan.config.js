const morgan = require("morgan");

const morganFormat =
  ":method :url :status :res[content-length] - :response-time ms :body";

morgan.token("body", ({ body }) => (body?.name ? JSON.stringify(body) : " "));

module.exports = { morganConfig: () => morgan(morganFormat) };
