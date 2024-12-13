const mongoose = require('mongoose');

// Función de conexión a MongoDB
const connectDB = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI, {
      /* useNewUrlParser: true,
      useUnifiedTopology: true, */
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error);
    process.exit(1); // Detiene la aplicación si no se puede conectar a MongoDB
  }
};

module.exports = connectDB;
