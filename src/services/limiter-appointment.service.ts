import { DateTime } from 'luxon';
import { AppointmentInput } from '../types';
import { prisma } from '../db/prisma';

export async function dateLimiter(data: AppointmentInput) {
  const { appointmentDate } = data;
  const minDate = DateTime.fromJSDate(new Date(appointmentDate)).toJSDate();
  const maxDate = DateTime.fromJSDate(new Date(appointmentDate)).plus({ minutes: 30 }).toJSDate();

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
      appointmentDate: {
        gte: minDate,
        lte: maxDate,
      },
    },
  });
  const dates = dateConsult.map((e) =>
    DateTime.fromJSDate(e.appointmentDate).toFormat('yyyy-LL-dd TT'),
  );

  if (dates.length === 2 || dates.includes(appointmentDate)) {
    throw new Error('Time not available.');
  }
}
