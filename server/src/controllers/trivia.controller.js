const Trivia = require('../model/trivia.model');

// Agregar una nueva trivia
exports.agregarTrivia = async (req, res) => {
  try {
    const nuevaTrivia = new Trivia(req.body);
    await nuevaTrivia.save();
    res.json(nuevaTrivia);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la trivia' });
  }
};

// Obtener una trivia por su ID
exports.obtenerTriviaPorId = async (req, res) => {
  try {
    const trivia = await Trivia.findById(req.params.id);
    if (trivia) {
      res.json(trivia);
    } else {
      res.status(404).json({ error: 'Trivia no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la trivia' });
  }
};

// Obtener trivias por autor
// exports.obtenerTriviasPorAutor = async (req, res) => {
//   try {
//     const trivias = await Trivia.find({ autor: req.params.autor });
//     console.log(trivias);
//     res.json(trivias);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener las trivias' });
//   }
// };



// Obtener trivias por autor
exports.obtenerTriviasPorAutor = async (req, res) => {
  try {
    const autor = req.params.autor;
    const trivia = await Trivia.find({ autor });
    res.json(trivia);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las trivias' });
  }
};


exports.obtenerTriviasPorCodigo = async (req, res) => {
    
    try {
        const codigo = req.params.codigo;
        const trivia = await Trivia.findOne({ codigo });
        res.json(trivia);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener las trivias' });
      }
  };

  /**
 * @param {Request} req
 * @param {Response} res
 */
async function getCodigo(req, res) {
    const { codigo } = req.params;
  
    if (!codigo) {
      return res.status(400).send("Se debe de enviar un nombre de usuario");
    }
  
    const trivia = await find(codigo);
  
    if (trivia) {
      res.json(trivia);
    } else {
      res.status(404).send(`No se encontro al usuario ${username}`);
    }
  }