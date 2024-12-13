const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, unique: true, required: true },
  rol: { type: String, enum: ['usuario', 'administrador'], default: 'usuario' },
  contraseña: { type: String, required: true },
});

usuarioSchema.pre('save', async function (next) {
  if (this.isModified('contraseña')) {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }
  next();
});

usuarioSchema.methods.compararContraseña = function (contraseña) {
  return bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
