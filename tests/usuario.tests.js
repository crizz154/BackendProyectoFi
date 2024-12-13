const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Usuario = require('../models/usuario'); 

beforeAll(async () => {
  // Conectar a una base de datos de prueba antes de ejecutar las pruebas
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  // Limpiar la base de datos después de las pruebas
  await Usuario.deleteMany({});
  await mongoose.connection.close();
});

describe('POST /usuarios/registro', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/usuarios/registro')
      .send({
        nombre: 'Test User',
        correo: 'test@example.com',
        contraseña: 'test1234',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuario creado exitosamente');
  });

  it('should return an error if the email is already registered', async () => {
    await request(app)
      .post('/usuarios/registro')
      .send({
        nombre: 'Test User',
        correo: 'test@example.com',
        contraseña: 'test1234',
      });

    const response = await request(app)
      .post('/usuarios/registro')
      .send({
        nombre: 'Another User',
        correo: 'test@example.com',
        contraseña: 'password1234',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('El correo ya está registrado');
  });
});

describe('POST /usuarios/login', () => {
  it('should log in and return a token', async () => {
    await request(app)
      .post('/usuarios/registro')
      .send({
        nombre: 'Test User',
        correo: 'test@example.com',
        contraseña: 'test1234',
      });

    const response = await request(app)
      .post('/usuarios/login')
      .send({
        correo: 'test@example.com',
        contraseña: 'test1234',
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return an error if credentials are incorrect', async () => {
    const response = await request(app)
      .post('/usuarios/login')
      .send({
        correo: 'test@example.com',
        contraseña: 'wrongpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Contraseña incorrecta');
  });
});

