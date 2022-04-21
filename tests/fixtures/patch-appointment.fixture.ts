import { Appointment } from '@prisma/client';

export function generateValidPatchInput() {
  return {
    attendance: true,
  };
}

export function generateValidUpdate(): Appointment {
  return {
    id: '5b1fac3a-265a-4ac4-a393-cd91dd752227',
    name: 'Roberto',
    dateOfBirth: new Date('07/11/1990'),
    appointmentDate: new Date('2022-08-13 14:00'),
    attendance: false,
  };
}

export function generateExpectedUpdate() {
  return {
    message: 'Appointment updated.',
    attendance: true,
  };
}

export function generateInvalidId() {
  return {
    id: '5b1fac3a-265a-4ac4-a393-cd91dd752',
  };
}

export function generateExpectedNotFound() {
  return {
    message: 'Appointment not found.',
  };
}

export function generateExpectedInvalidBody() {
  return {
    errors: ['attendance must be a boolean value'],
  };
}
