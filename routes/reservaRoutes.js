const express = require('express');
const router = express.Router();
const { crearReserva } = require('../controllers/reservaController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, crearReserva);

module.exports = router;
