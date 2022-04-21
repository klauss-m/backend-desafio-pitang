import { Request, Response } from 'express';
import { DateTime } from 'luxon';
import { dateLimiter } from '../services/limiter-appointment.service';
import { postAppointment } from '../services/post-appointment.service';
import { appointmentValidation } from '../services/validation-appointment.service';
import { AppointmentInput } from '../types';

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

  const [, time] = (req.body as AppointmentInput).appointmentDate.split(' ');
  const [, min] = time.split(':');
  if (!['00', '30'].includes(min)) {
    return res.status(400).json({ message: 'Invalid date.' });
  }

  try {
    await dateLimiter(req.body);
    const insert = await postAppointment(req.body);
    return res.status(201).json({
      message: 'Appointment created.',
      appointmentDate: DateTime.fromJSDate(insert.appointmentDate).toFormat('dd/LL/yyyy TT'),
    });
  } catch (err) {
    const error = err as Error;
    return res
      .status(['Date not available.', 'Time not available.'].includes(error.message) ? 400 : 500)
      .json({ message: error.message ?? 'Internal server error.' });
  }
}
