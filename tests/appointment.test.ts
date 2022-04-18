import supertest from 'supertest';
import { server } from '../src/server';
import appointmentGetFixture from './fixtures/appointments.get.json';
// import * as appointmentService from '../src/services';
import * as getAppointments from '../src/services/get-appointment.service';
import * as patchAppointments from '../src/services/patch-appointment.service';
import * as postAppointments from '../src/services/post-appointment.service';
import * as dateLimiter from '../src/services/limiter-appointment.service';
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
    const getAppointmentsMock = jest.spyOn(getAppointments, 'getAppointments');
    getAppointmentsMock.mockResolvedValue(appointmentGetFixture);

    const unit = supertest(server);
    const result = await unit.get('/appointments');

    expect(result.statusCode).toBe(200);
    expect(JSON.stringify(result.body)).toEqual(JSON.stringify(appointmentGetFixture));
  });
});

describe('postAppointment', () => {
  it('should successfully create an appointment', async () => {
    const postAppointmentMock = jest.spyOn(postAppointments, 'postAppointment');
    postAppointmentMock.mockResolvedValue(appointmentFixtureFixed);
    const appointmentDateMock = jest.spyOn(dateLimiter, 'dateLimiter');
    appointmentDateMock.mockImplementationOnce(jest.fn());

    const unit = supertest(server);
    const result = await unit.post('/appointments/new').send({
      name: 'Raphael',
      dateOfBirth: new Date('11/07/1990'),
      appointmentDate: new Date('2020-02-08 09:30'),
    });
    expect(result.statusCode).toBe(201);
    expect(JSON.stringify(result.body)).toEqual(JSON.stringify(appointmentFixtureFixed));
  });

  it('should return a bad request when time is not available', async () => {
    const postAppointmentMock = jest.spyOn(postAppointments, 'postAppointment');
    postAppointmentMock.mockResolvedValue(appointmentFixtureFixed);
    const appointmentDateMock = jest.spyOn(dateLimiter, 'dateLimiter');
    appointmentDateMock.mockImplementationOnce(() => {
      throw new Error('Date not available.');
    });

    const unit = supertest(server);
    const result = await unit.post('/appointments/new').send({
      name: 'Raphael',
      dateOfBirth: new Date('11/07/1990'),
      appointmentDate: new Date('2020-02-08 09:30'),
    });
    expect(appointmentDateMock).toHaveBeenCalled();
    expect(result.statusCode).toBe(400);
    expect(JSON.stringify(result.body)).toEqual(JSON.stringify({ message: 'Date not available.' }));
  });
});

describe('updateAppointment', () => {
  it('should successfully update an appointment', async () => {
    const updateAppointmentMock = jest.spyOn(patchAppointments, 'patchAppointment');
    updateAppointmentMock.mockResolvedValue(appointmentFixtureFixed);

    const unit = supertest(server);
    const result = await unit.patch(`/appointments/${appointmentFixtureFixed.id}`).send({
      attendance: true,
    });
    expect(result.statusCode).toBe(200);
    expect(JSON.stringify(result.body)).toEqual(JSON.stringify(appointmentFixtureFixed));
  });
});
