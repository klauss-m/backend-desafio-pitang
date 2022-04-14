import { Appointment } from '@prisma/client';
import { DateTime } from 'luxon';
import { validate, IsAlpha, IsDateString, IsString, Length } from 'class-validator';
import { prisma } from '../db/prisma';

class AppointmentValidator {
  @IsString()
  @IsAlpha('pt-BR', { message: 'The name must contain alphanumeric characters only.' })
  @Length(3, 50, { message: 'The name must contain between 3 and 50 characteres only.' })
  name!: string;

  @IsDateString({ message: 'Must contain a valid date.' })
  dateOfBirth!: string;

  @IsDateString({ message: 'Must contain a valid date.' })
  appointmentDate!: string;
}

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

export async function appointmentValidation(data: Appointment) {
  const val = new AppointmentValidator();
  val.name = data.name;
  val.dateOfBirth = data.dateOfBirth.toString();
  val.appointmentDate = data.appointmentDate.toString();

  const validation = await validate(val);
  return validation;
}
