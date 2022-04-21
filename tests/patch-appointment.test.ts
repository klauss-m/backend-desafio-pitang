import supertest from 'supertest';
import { prisma } from '../src/db/prisma';
import { server } from '../src/server';
import * as fixtures from './fixtures/patch-appointment.fixture';

describe('patch-appointment', () => {
  it('should successfully update an appointment attendance', async () => {
    prisma.appointment.findFirst = jest
      .fn()
      .mockImplementation(() => fixtures.generateValidUpdate().id);
    prisma.appointment.update = jest.fn().mockResolvedValue(fixtures.generateExpectedUpdate());

    const unit = supertest(server);
    const result = await unit
      .patch(`/appointments/${fixtures.generateValidUpdate().id}`)
      .send(fixtures.generateValidPatchInput());

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(fixtures.generateExpectedUpdate());
  });

  it('should throw an error when it fails to find an appointment', async () => {
    prisma.appointment.findFirst = jest.fn().mockImplementation(() => {});

    const unit = supertest(server);
    const result = await unit
      .patch(`/appointments/${fixtures.generateInvalidId()}`)
      .send(fixtures.generateValidPatchInput());

    expect(result.statusCode).toBe(404);
    expect(result.body).toEqual({ message: 'Appointment not found.' });
  });

  it('should throw an error when body contains invalid value', async () => {
    prisma.appointment.findFirst = jest
      .fn()
      .mockImplementation(() => fixtures.generateValidUpdate());

    const unit = supertest(server);
    const result = await unit.patch(`/appointments/${fixtures.generateValidUpdate().id}`).send({});

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual({ errors: ['attendance must be a boolean value'] });
  });

  it('should throw an error when there is a database error', async () => {
    prisma.appointment.findFirst = jest.fn().mockImplementation(() => {
      throw new Error();
    });

    const unit = supertest(server);
    const result = await unit
      .patch(`/appointments/${fixtures.generateValidUpdate().id}`)
      .send(fixtures.generateValidUpdate());

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual({ message: 'Database error.' });
  });
});
