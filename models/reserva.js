const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  salaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sala', required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  estado: { type: Boolean, default: true }, // true: activa, false: inactiva
});

module.exports = mongoose.model('Reserva', reservaSchema);
