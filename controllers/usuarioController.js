const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registro = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    } 


    const nuevoUsuario = new Usuario({ nombre, correo, contraseña });
    await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

const login = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
    const esValido = await usuario.compararContraseña(contraseña);
    if (!esValido) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: usuario._id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Obtener todos los usuarios (solo para administradores)
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Obtener un usuario específico
const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};


const actualizarRolUsuario = async (req, res) => {
  const { id } = req.params; // ID del usuario a actualizar
  const { rol } = req.body; // Nuevo rol

  try {
    // Validar el rol proporcionado
    if (!['usuario', 'administrador'].includes(rol)) {
      return res.status(400).json({ message: 'Rol inválido. Debe ser "usuario" o "administrador".' });
    }

    // Buscar y actualizar el rol del usuario
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { rol },
      { new: true, runValidators: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ message: 'Rol actualizado correctamente.', usuario: usuarioActualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el rol.', error: error.message });
  }
};

module.exports = { registro, login, obtenerUsuarios, obtenerUsuarioPorId, actualizarRolUsuario };
