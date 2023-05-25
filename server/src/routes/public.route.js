const { Router } = require("express");
const { dirname } = require("path");
const fs = require("fs");

const publicRoutes = Router();

publicRoutes.get("/images/:imageName", function (req, res) {
  const { imageName } = req.params;
  const rootDIr = dirname(require.main?.filename);
  const imageFullPath = `${rootDIr}/public/images/${imageName}`;
  console.log(rootDIr, imageFullPath)

  fs.access(imageFullPath, (err) =>
    err
      ? res.status(404).send("La imagen no existe")
      : res.sendFile(imageFullPath)
  );
});

module.exports = { publicRoutes };
