const express = require('express');
const router = express.Router();
const { registro, login, obtenerUsuarios, obtenerUsuarioPorId, actualizarRolUsuario } = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware'); // Importa el middleware de autenticación


router.post('/registro', registro);
router.post('/login', login); 
router.get('/', authMiddleware, obtenerUsuarios); // Solo para administradores
router.get('/:id', authMiddleware, obtenerUsuarioPorId); // Obtener un usuario específico
router.put('/:id/rol', authMiddleware, actualizarRolUsuario); // Ruta para actualizar el rol


module.exports = router;
