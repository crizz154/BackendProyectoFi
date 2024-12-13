const Sala = require('../models/sala');

const obtenerSalas = async (req, res) => {
  try {
    const salas = await Sala.find();
    res.json(salas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener salas', error: error.message });
  }
}; 
const crearSala = async (req, res) => {
  const { nombre, capacidad, estado, ubicacion } = req.body;

  try {
    if (!nombre || !capacidad || !estado || !ubicacion) {
      return res.status(400).json({ message: 'Nombre y capacidad son obligatorios.' });
    }

    const nuevaSala = new Sala({ nombre, capacidad, estado, ubicacion });
    await nuevaSala.save();

    res.status(201).json({ message: 'Sala creada exitosamente.', sala: nuevaSala });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la sala.', error: error.message });
  }
};

module.exports = { obtenerSalas, crearSala };
