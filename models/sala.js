const mongoose = require('mongoose');

const salaSchema = new mongoose.Schema({
  nombre: { type: String, unique: true, required: true },
  capacidad: { type: Number, required: true },
  estado: { type: Boolean, default: true }, // true: activa, false: inactiva
  ubicacion: { type: String, required: true },
});

module.exports = mongoose.model('Sala', salaSchema);
