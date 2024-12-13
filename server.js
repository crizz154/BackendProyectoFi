// Cargar las variables de entorno desde el archivo config/env.js
const { MONGO_URI, JWT_SECRET, PORT } = require('./config/env');

// Importar módulos necesarios
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const usuarioRoutes = require('./routes/usuarioRoutes');
const salaRoutes = require('./routes/salaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());

// Conectar a la base de datos
connectDB(MONGO_URI);

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/salas', salaRoutes);
app.use('/reservas', reservaRoutes);

// Manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
