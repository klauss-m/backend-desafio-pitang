import faker from '@faker-js/faker';
import { Appointment } from '@prisma/client';
import { ValidationError } from 'class-validator';

export function generateInput() {
  return {
    valid: {
      name: 'Sandro',
      dateOfBirth: '1990-07-10',
      appointmentDate: '2022-08-11 18:00:00',
    },
    invalid: {
      name: 'Sa',
      dateOfBirth: '1990-07-1',
      appointmentDate: '2022-08- 21:30:00',
    },
    incongruous: {
      name: 'Sandro',
      dateOfBirth: '1990-07-10',
      appointmentDate: '2022-08-11 18:15:00',
    },
    unavailable: {
      name: 'Ramiro',
      dateOfBirth: '1990-07-12',
      appointmentDate: '2022-08-11 18:00:00',
    },
  };
}

export function generateValidCreate() {
  return {
    id: '6c82f246-c105-11ec-9d64-0242ac120002',
    name: 'Abanirlo',
    dateOfBirth: new Date('17/07/1990'),
    appointmentDate: new Date('2022-08-11 18:00:00'),
    attendance: false,
  };
}

export function generateValidationError(): ValidationError[] {
  return [
    {
      target: {
        name: 'Ab',
        dateOfBirth: '1990-07-1',
        appointmentDate: '2022-08- 21:30:00',
      },
      value: 'Ab',
      property: 'name',
      children: [],
      constraints: {
        isLength: 'The name must contain between 3 and 50 characteres only.',
      },
    },
    {
      target: {
        name: 'Ab',
        dateOfBirth: '1990-07-1',
        appointmentDate: '2022-08- 21:30:00',
      },
      value: '1990-07-1',
      property: 'dateOfBirth',
      children: [],
      constraints: {
        isDateString: 'dateOfBirth must be a valid ISO 8601 date string',
      },
    },
    {
      target: {
        name: 'Ab',
        dateOfBirth: '1990-07-1',
        appointmentDate: '2022-08- 21:30:00',
      },
      value: '2022-08- 21:30:00',
      property: 'appointmentDate',
      children: [],
      constraints: {
        isDateString: 'appointmentDate must be a valid ISO 8601 date string',
      },
    },
  ];
}

export function generateExpectedValidCreate() {
  return {
    message: 'Appointment created.',
    appointmentDate: '11/08/2022 18:00:00',
  };
}

export function generateExpectedInvalidCreate() {
  return {
    errors: [
      'The name must contain between 3 and 50 characteres only.',
      'dateOfBirth must be a valid ISO 8601 date string',
      'appointmentDate must be a valid ISO 8601 date string',
    ],
  };
}

export function generateExpectedIncongruousCreate() {
  return {
    message: 'Invalid date.',
  };
}

export function generateExpectedDatabaseError() {
  return {
    message: 'Database error.',
  };
}

export function generateDailyLimit(): Appointment[] {
  const appointments: Appointment[] = [];

  while (appointments.length < 20) {
    appointments.push({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      dateOfBirth: faker.date.past(),
      appointmentDate: new Date(),
      attendance: faker.datatype.boolean(),
    });
  }

  return appointments;
}

export function generateExpectedDateUnavailable() {
  return {
    message: 'Date not available.',
  };
}
export function generateHourlyLimit(): Appointment[] {
  return [
    {
      id: '6c82f246-c105-11ec-9d64-0242ac120002',
      name: 'Abanirlo',
      dateOfBirth: new Date(),
      appointmentDate: new Date('11/08/2022 18:00:00'),
      attendance: false,
    },
    {
      id: '6c82f246-c105-11ec-9d64-0242ac120003',
      name: 'Abanirlo',
      dateOfBirth: new Date(),
      appointmentDate: new Date('11/08/2022 18:30:00'),
      attendance: false,
    },
  ];
}

export function generateExpectedTimeUnavailable() {
  return {
    message: 'Time not available.',
  };
}
