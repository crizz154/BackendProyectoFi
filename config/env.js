// Cargar el paquete dotenv
require('dotenv').config();


// Validar que todas las variables de entorno necesarias estén definidas
const requiredEnvVariables = [
  'MONGO_URI', // URI de conexión a MongoDB
  'JWT_SECRET', // Secreto para el token JWT
  'PORT' // Puerto donde se ejecutará el servidor
];

requiredEnvVariables.forEach((variable) => {
  if (!process.env[variable]) {
    console.error(`Error: la variable de entorno ${variable} no está definida.`);
    process.exit(1); // Detener la aplicación si falta alguna variable importante
  }
});

// Exportar las variables de entorno para que puedan ser usadas en otras partes de la aplicación
module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 5000, // Establecer un puerto por defecto en caso de que no se defina en el archivo .env
};
