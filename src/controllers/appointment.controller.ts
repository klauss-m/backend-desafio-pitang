import { Request, Response } from 'express';
import {
  appointmentValidation,
  getAppointments,
  patchAppointment,
  postAppointment,
  patchAppointmentValidation,
} from '../services/appointment.service';

export async function appointmentsList(req: Request, res: Response) {
  try {
    const result = await getAppointments();
    return res.json(result);
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ message: error.message });
  }
}

export async function appointmentCreate(req: Request, res: Response) {
  const validation = await appointmentValidation(req.body);
  if (validation.length) {
    return res.status(400).json({
      errors: validation.map((e) => {
        const msg = Object.values(e.constraints!);
        return msg.join(' ');
      }),
    });
  }
  try {
    const insert = await postAppointment(req.body);
    return res.status(201).json(insert);
  } catch (err) {
    return res.status(400).json({ message: 'Failed to create an appointment.' });
  }
}

export async function appointmentUpdate(req: Request, res: Response) {
  const validation = await patchAppointmentValidation(req.body);
  const { id } = req.params;
  if (validation.length) {
    return res.status(400).json({
      errors: validation.map((e) => {
        const msg = Object.values(e.constraints!);
        return msg.join(' ');
      }),
    });
  }
  try {
    const insert = await patchAppointment(req.body, id);
    return res.status(200).json(insert);
  } catch (err) {
    const error = err as Error;
    if (error.message === 'Appointment not found.') {
      return res.status(404).json({ message: error.message });
    }
    return res.status(400).json({ message: 'Failed to update appointment.' });
  }
}
