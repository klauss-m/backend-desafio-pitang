import { AppointmentInput } from '../types';
import { prisma } from '../db/prisma';

export async function patchAppointment(data: Partial<AppointmentInput>, id: string) {
  const input = {} as any;
  input.name = data.name ?? undefined;
  input.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : undefined;
  input.appointmentDate = data.appointmentDate ? new Date(data.appointmentDate) : undefined;
  input.attendance = data.attendance;
  const appointment = await prisma.appointment.findFirst({
    where: { id },
  });
  if (!appointment) {
    throw new Error('Appointment not found.');
  }
  const registry = await prisma.appointment.update({
    where: { id },
    data: { attendance: input.attendance },
  });
  return registry;
}
