import { DateTime } from 'luxon';
import { prisma } from '../db/prisma';

export async function getAppointments() {
  try {
    const registries = await prisma.appointment.findMany();
    const appointments = registries.map((reg) => ({
      ...reg,
      dateOfBirth: DateTime.fromJSDate(reg.dateOfBirth).toFormat('dd/LL/yyyy'),
      appointmentDate: DateTime.fromJSDate(reg.appointmentDate).toFormat('dd/LL/yyyy TT'),
    }));
    return appointments;
  } catch (err) {
    throw new Error('Failed to get appointments.');
  }
}
