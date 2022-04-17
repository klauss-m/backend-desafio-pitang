/* eslint-disable max-classes-per-file */
import { DateTime } from 'luxon';
import { validate, IsAlpha, IsDateString, IsString, Length, IsBoolean } from 'class-validator';
import { prisma } from '../db/prisma';

type AppointmentInput = {
  id: string;
  name: string;
  dateOfBirth: string;
  appointmentDate: string;
  attendance: boolean;
};

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

class AppointmentPatchValidator {
  @IsBoolean()
  attendance!: boolean;
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

export async function postAppointment(data: AppointmentInput) {
  const input = {} as any;
  input.name = data.name;
  input.dateOfBirth = new Date(data.dateOfBirth);
  input.appointmentDate = new Date(data.appointmentDate);
  const registry = await prisma.appointment.create({ data: input });
  return registry;
}

export async function appointmentValidation(data: AppointmentInput) {
  const val = new AppointmentValidator();
  val.name = data.name;
  val.dateOfBirth = data.dateOfBirth;
  val.appointmentDate = data.appointmentDate;

  const validation = await validate(val);
  return validation;
}

export async function patchAppointmentValidation(data: AppointmentInput) {
  const val = new AppointmentPatchValidator();
  val.attendance = data.attendance;

  const validation = await validate(val);
  return validation;
}

export async function patchAppointment(data: Partial<AppointmentInput>, id: string) {
  const input = {} as any;
  input.name = data.name ?? undefined;
  input.dateOfBirth = data.dateOfBirth ? new Date(data.dateOfBirth) : undefined;
  input.appointmentDate = data.appointmentDate ? new Date(data.appointmentDate) : undefined;
  input.attendance = data.attendance ?? undefined;
  const appointment = await prisma.appointment.findFirst({
    where: { id },
  });
  if (!appointment) {
    throw new Error('Appointment not found.');
  }
  const registry = await prisma.appointment.update({
    where: { id },
    data: input,
  });
  return registry;
}
