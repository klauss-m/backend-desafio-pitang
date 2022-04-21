import supertest from 'supertest';
import { server } from '../src/server';
import { prisma } from '../src/db/prisma';
import * as fixtures from './fixtures/post-appointment.fixture';
import * as appointmentValidationService from '../src/services/validation-appointment.service';

describe('post-appointment', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should successfully create an appointment', async () => {
    prisma.appointment.create = jest.fn().mockResolvedValue(fixtures.generateValidCreate());
    prisma.appointment.findMany = jest.fn().mockResolvedValue([]);

    const unit = supertest(server);
    const result = await unit.post('/appointments').send(fixtures.generateInput().valid);

    expect(result.statusCode).toBe(201);
    expect(result.body).toEqual(fixtures.generateExpectedValidCreate());
  });

  it('should throw a validation error on invalid inputs', async () => {
    const validationMock = jest.spyOn(appointmentValidationService, 'appointmentValidation');
    validationMock.mockResolvedValue(fixtures.generateValidationError());

    const unit = supertest(server);
    const result = await unit.post('/appointments').send(fixtures.generateInput().invalid);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(fixtures.generateExpectedInvalidCreate());
  });

  it('should throw an error when creating an appointment with incongruous minutes.', async () => {
    const unit = supertest(server);
    const result = await unit.post('/appointments').send(fixtures.generateInput().incongruous);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(fixtures.generateExpectedIncongruousCreate());
  });

  it('should throw an error when creating an appointment when past the daily appointment limit.', async () => {
    prisma.appointment.findMany = jest.fn().mockResolvedValue(fixtures.generateDailyLimit());

    const unit = supertest(server);
    const result = await unit.post('/appointments').send(fixtures.generateInput().valid);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(fixtures.generateExpectedDateUnavailable());
  });

  it('should throw an error when creating an appointment when past the hourly appointment limit.', async () => {
    prisma.appointment.findMany = jest.fn().mockResolvedValue(fixtures.generateHourlyLimit());

    const unit = supertest(server);
    const result = await unit.post('/appointments').send(fixtures.generateInput().unavailable);

    expect(result.statusCode).toBe(400);
    expect(result.body).toEqual(fixtures.generateExpectedTimeUnavailable());
  });

  it('should throw an error on database error.', async () => {
    prisma.appointment.create = jest.fn().mockImplementation(() => {
      throw new Error('Database error.');
    });
    prisma.appointment.findMany = jest.fn().mockResolvedValue([]);

    const unit = supertest(server);
    const result = await unit.post('/appointments').send(fixtures.generateInput().valid);

    expect(result.statusCode).toBe(500);
    expect(result.body).toEqual(fixtures.generateExpectedDatabaseError());
  });
});
