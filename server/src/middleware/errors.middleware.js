function errorsMiddleware(err, req, res, next) {
  if (err.name === "ValidationError") {
    const errorsMessages = err.errors.map((e) => e.message);
    console.log(...errorsMessages);
    return res.status(400).send(errorsMessages);
  }
  next();
}

module.exports = {
  errorsMiddleware,
};
