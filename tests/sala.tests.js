const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Sala = require('../models/sala');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

afterAll(async () => {
  await Sala.deleteMany({});
  await mongoose.connection.close();
});

describe('POST /salas', () => {
  it('should create a new room', async () => {
    const response = await request(app)
      .post('/salas')
      .send({
        nombre: 'Sala 1',
        capacidad: 20,
        ubicacion: 'Primer Piso',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Sala creada exitosamente');
  });

  it('should not allow creating a room with a duplicate name', async () => {
    await request(app)
      .post('/salas')
      .send({
        nombre: 'Sala 1',
        capacidad: 20,
        ubicacion: 'Primer Piso',
      });

    const response = await request(app)
      .post('/salas')
      .send({
        nombre: 'Sala 1',
        capacidad: 15,
        ubicacion: 'Segundo Piso',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Ya existe una sala con ese nombre');
  });
});

describe('GET /salas', () => {
  it('should get all rooms', async () => {
    const response = await request(app).get('/salas');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
