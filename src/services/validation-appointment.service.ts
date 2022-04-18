/* eslint-disable max-classes-per-file */
import { validate, IsAlpha, IsDateString, IsString, Length, IsBoolean } from 'class-validator';
import { AppointmentInput } from '../types';

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
