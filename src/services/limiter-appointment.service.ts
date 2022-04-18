import { DateTime } from 'luxon';
import { AppointmentInput } from '../types';
import { prisma } from '../db/prisma';

export async function dateLimiter(data: AppointmentInput) {
  const { appointmentDate } = data;
  const minDate = DateTime.fromJSDate(new Date(appointmentDate)).toFormat('dd/LL/yyyy TT');
  const maxDate = DateTime.fromJSDate(new Date(appointmentDate))
    .plus({ minutes: 30 })
    .toFormat('dd/LL/yyyy TT');

  const limitTwenty = await prisma.appointment.findMany({
    where: {
      appointmentDate: {
        gte: new Date(appointmentDate),
        lt: DateTime.fromJSDate(new Date(appointmentDate)).plus({ day: 1 }).toJSDate(),
      },
    },
  });

  if (limitTwenty.length >= 20) {
    throw new Error('Date not available.');
  }

  const dateConsult = await prisma.appointment.findMany({
    where: {
      OR: [
        {
          appointmentDate: {
            equals: new Date(minDate),
          },
        },
        {
          appointmentDate: {
            equals: new Date(maxDate),
          },
        },
      ],
    },
  });

  const dates = dateConsult.map((e) => e.appointmentDate);

  if (dates.length === 2 || dates.includes(new Date(appointmentDate))) {
    throw new Error('Time not available.');
  }
}
