const Reserva = require('../models/reserva');
const Sala = require('../models/sala');

const crearReserva = async (req, res) => {
  const { salaId, fechaInicio, fechaFin } = req.body;
  try {
    // Verificar que la sala esté disponible
    const reservasSolapadas = await Reserva.find({
      salaId,
      $or: [
        { fechaInicio: { $lt: fechaFin }, fechaFin: { $gt: fechaInicio } }
      ]
    });

    if (reservasSolapadas.length > 0) {
      return res.status(400).json({ message: 'La sala ya está reservada en este horario' });
    }

    const nuevaReserva = new Reserva({ salaId, fechaInicio, fechaFin });
    await nuevaReserva.save();
    res.status(201).json({ message: 'Reserva creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
};

module.exports = { crearReserva };
