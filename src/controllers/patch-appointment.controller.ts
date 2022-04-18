import { Request, Response } from 'express';
import { patchAppointment } from '../services/patch-appointment.service';
import { patchAppointmentValidation } from '../services/validation-appointment.service';

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
