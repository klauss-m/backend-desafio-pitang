import supertest from 'supertest';
import { server } from '../src/server';
import appointmentGetFixture from './fixtures/appointments.get.json';
import * as appointmentService from '../src/services/appointment.service';
import appointmentPostFixture from './fixtures/appointments.post.json';

const appointmentFixtureFixed = appointmentPostFixture as unknown as {
  id: string;
  name: string;
  dateOfBirth: Date;
  appointmentDate: Date;
  attendance: boolean;
};

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

describe('postAppointment', () => {
  it('should successfully create an appointment', async () => {
    const postAppointmentMock = jest.spyOn(appointmentService, 'postAppointment');
    postAppointmentMock.mockResolvedValue(appointmentFixtureFixed);
    const unit = supertest(server);
    const result = await unit.post('/appointments/new').send({
      name: 'Raphael',
      dateOfBirth: new Date('11/07/1990'),
      appointmentDate: new Date('2020-02-08 09:30'),
    });
    expect(result.statusCode).toBe(201);
    expect(JSON.stringify(result.body)).toEqual(JSON.stringify(appointmentFixtureFixed));
  });
});
