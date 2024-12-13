const express = require('express');
const router = express.Router();
const { obtenerSalas, crearSala } = require('../controllers/salaController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, obtenerSalas);
router.post('/', authMiddleware, crearSala); // Crear una sala
module.exports = router;
