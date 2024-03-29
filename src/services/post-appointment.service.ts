import { prisma } from '../db/prisma';
import { AppointmentInput } from '../types';

export async function postAppointment(data: AppointmentInput) {
  try {
    const input = {} as any;
    input.name = data.name;
    input.dateOfBirth = new Date(data.dateOfBirth);
    input.appointmentDate = new Date(data.appointmentDate);
    const registry = await prisma.appointment.create({ data: input });
    return registry;
  } catch (err) {
    throw new Error('Database error.');
  }
}
