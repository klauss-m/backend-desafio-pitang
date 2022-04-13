import supertest from 'supertest';
import { server } from '../src/server';
import appointmentGetFixture from './fixtures/appointments.get.json';
import * as appointmentService from '../src/services/appointment.service';

describe('appointment', () => {
  it('returns a valid list of appointments', async () => {
    const getAppointmentsMock = jest.spyOn(appointmentService, 'getAppointments');
    getAppointmentsMock.mockResolvedValue(appointmentGetFixture);
    const unit = supertest(server);
    const result = await unit.get('/appointments');
    expect(result.statusCode).toBe(200);
    expect(JSON.stringify(result.body)).toEqual(JSON.stringify(appointmentGetFixture));
  });
});
