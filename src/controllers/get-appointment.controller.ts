import { Request, Response } from 'express';
import { getAppointments } from '../services/get-appointment.service';

export async function appointmentsList(req: Request, res: Response) {
  try {
    const result = await getAppointments();
    return res.json(result);
  } catch (err) {
    const error = err as Error;
    return res.status(500).json({ message: error.message });
  }
}
