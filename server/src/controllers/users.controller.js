const {
  findOneUser,
  login,
  signup,
  updateOneUser,
  deleteOneUser,
  addWinToUser,
} = require("../services/users.service");

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getUser(req, res) {
  const { username } = req.params;

  if (!username) {
    return res.status(400).send("Se debe de enviar un nombre de usuario");
  }

  const user = await findOneUser(username);

  if (user) {
    res.json(user);
  } else {
    res.status(404).send(`No se encontro al usuario ${username}`);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function makeLogin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send("Se debe de enviar un nombre de usuario y contraseña");
  }

  try {
    const user = await login(username, password);

    res.json(user);
    console.log('Usuario');
  } catch (err) {
    res.status(400).send(err.message);
    console.log('No es usuario');
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function makeSignup(req, res) {
  const { name, username, password, student } = { student: true, ...req.body };

  if (!name || !username || !password) {
    return res
      .status(400)
      .send(
        "Se debe de enviar un nombre completo, nombre " +
          "de usuario y contraseña obligatoriamente"
      );
  }

  await signup(name, username, password, student);
  console.log("signup");

  // Envía una respuesta al cliente con los datos del usuario registrado
  res.status(201).json({ message: "Usuario registrado correctamente" });

  res.status(201);
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function updateUser(req, res) {
  const user = req.body;

  if (!user?.username) {
    return res
      .status(400)
      .send("Se debe de mandar un objeto usuario con nombre de usuario");
  }

  const newUser = await updateOneUser(user);

  if (newUser) {
    res.json(newUser);
  } else {
    res.status(404).send("El usuario no se encontro");
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function deleteUser(req, res) {
  const { username } = req.params;

  if (!username) {
    return res.status(400).send("Se debe de enviar un nombre de usuario");
  }

  const deleted = await deleteOneUser(username);

  if (deleted) {
    res.status(204).send("Se elimino con exito el usuario");
  } else {
    res.status(204).send(`No se encontro ningun usuario ${username}`);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function addWinner(req, res) {
  const { username, game } = req.body;

  if (!username || !game) {
    return res
      .status(400)
      .send(
        "Se debe de mandar un objeto con el " +
          "nombre de usuario y el nombre del juego"
      );
  }

  await addWinToUser(username, game);

  res.status(201).send("Se agrego la victoria al perfil del usuario");
}

module.exports = {
  getUser,
  makeLogin,
  makeSignup,
  updateUser,
  deleteUser,
  addWinner,
};
