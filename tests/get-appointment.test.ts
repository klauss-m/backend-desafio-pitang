import supertest from 'supertest';
import { Appointment } from '@prisma/client';
import { server } from '../src/server';
import { prisma } from '../src/db/prisma';
import getAppointmentDbFixture from './fixtures/get-appointment.db';
import getAppointmentEndpointFixture from './fixtures/get-appointment.endpoint.json';

describe('get-appointment', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should return a list of all appointments', async () => {
    prisma.appointment.findMany = jest
      .fn()
      .mockResolvedValue(getAppointmentDbFixture as unknown as Appointment);

    const unit = supertest(server);
    const result = await unit.get('/appointments');

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(getAppointmentEndpointFixture);
  });

  it('should fail when there is a database error', async () => {
    prisma.appointment.findMany = jest.fn().mockImplementation(() => {
      throw new Error('Database error.');
    });

    const unit = supertest(server);
    const result = await unit.get('/appointments');

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual({ message: 'Database error.' });
  });
});
