import { Appointment } from '@prisma/client';
import { DateTime } from 'luxon';
import { prisma } from '../db/prisma';

export async function getAppointments() {
  try {
    const registries = await prisma.appointment.findMany();
    const appointments = registries.map((reg: Appointment) => ({
      ...reg,
      dateOfBirth: DateTime.fromJSDate(reg.dateOfBirth).toFormat('dd/LL/yyyy'),
      appointmentDate: DateTime.fromJSDate(reg.appointmentDate).toFormat('dd/LL/yyyy TT'),
    }));
    return appointments;
  } catch (err) {
    throw new Error('Database error.');
  }
}
