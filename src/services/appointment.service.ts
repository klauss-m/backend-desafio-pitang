import { Appointment } from '@prisma/client';
import { DateTime } from 'luxon';
import { prisma } from '../db/prisma';

export async function getAppointments() {
  const registries = await prisma.appointment.findMany();
  const appointments = registries.map((reg) => ({
    ...reg,
    dateOfBirth: DateTime.fromJSDate(reg.dateOfBirth).toFormat('dd/LL/yyyy'),
    appointmentDate: DateTime.fromJSDate(reg.appointmentDate).toFormat('dd/LL/yyyy TT'),
  }));
  return appointments;
}

export async function postAppointment(data: Appointment) {
  const input = {} as any;
  input.name = data.name;
  input.dateOfBirth = new Date(data.dateOfBirth);
  input.appointmentDate = new Date(data.appointmentDate);
  const registry = await prisma.appointment.create({ data: input });
  return registry;
}
