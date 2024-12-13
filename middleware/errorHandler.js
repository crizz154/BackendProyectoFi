const errorHandler = (err, req, res, next) => {
  console.error(err); // Imprimir el error en la consola para depuración

  // Determinar el código de estado HTTP a retornar
  const statusCode = err.status || 500;

  // Enviar la respuesta al cliente
  res.status(statusCode).json({
      message: statusCode === 500 ? 'Ocurrió un error inesperado' : err.message, // Mensaje genérico para errores 500
      error: process.env.NODE_ENV === 'development' ? err : {} // Mostrar detalles del error solo en desarrollo
  });
};

module.exports = errorHandler;
