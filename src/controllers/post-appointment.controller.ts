import { Request, Response } from 'express';
import { dateLimiter } from '../services/limiter-appointment.service';
import { postAppointment } from '../services/post-appointment.service';
import { appointmentValidation } from '../services/validation-appointment.service';

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
    await dateLimiter(req.body);
  } catch (err) {
    const error = err as Error;
    return res.status(400).json({ message: error.message });
  }

  try {
    const insert = await postAppointment(req.body);
    return res.status(201).json(insert);
  } catch (err) {
    return res.status(400).json({ message: 'Failed to create an appointment.' });
  }
}
