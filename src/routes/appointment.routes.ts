import { Router } from 'express';
import { appointmentsList } from '../controllers/appointment.controller';

const appointmentRouter = Router();

appointmentRouter.get('/', appointmentsList);

export { appointmentRouter };
