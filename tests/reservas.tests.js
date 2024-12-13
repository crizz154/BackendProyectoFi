const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Reserva = require('../models/reserva');
const Sala = require('../models/sala');
const Usuario = require('../models/usuario');

let salaId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  const sala = new Sala({
    nombre: 'Sala Test',
    capacidad: 10,
    ubicacion: 'Tercer Piso',
  });
  const savedSala = await sala.save();
  salaId = savedSala._id;

  const usuario = new Usuario({
    nombre: 'Test User',
    correo: 'test@example.com',
    contraseña: 'test1234',
  });
  await usuario.save();
});

afterAll(async () => {
  await Reserva.deleteMany({});
  await Sala.deleteMany({});
  await Usuario.deleteMany({});
  await mongoose.connection.close();
});

describe('POST /reservas', () => {
  it('should create a reservation', async () => {
    const response = await request(app)
      .post('/reservas')
      .send({
        salaId,
        fechaInicio: '2024-12-15T10:00:00Z',
        fechaFin: '2024-12-15T12:00:00Z',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Reserva creada exitosamente');
  });

  it('should not allow overlapping reservations', async () => {
    await request(app)
      .post('/reservas')
      .send({
        salaId,
        fechaInicio: '2024-12-15T10:00:00Z',
        fechaFin: '2024-12-15T12:00:00Z',
      });

    const response = await request(app)
      .post('/reservas')
      .send({
        salaId,
        fechaInicio: '2024-12-15T11:00:00Z',
        fechaFin: '2024-12-15T13:00:00Z',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('La sala ya está reservada en este horario');
  });
});
