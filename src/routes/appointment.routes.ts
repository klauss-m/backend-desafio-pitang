import { Router } from 'express';
import { appointmentCreate, appointmentsList } from '../controllers/appointment.controller';

const appointmentRouter = Router();

appointmentRouter.get('/', appointmentsList);
appointmentRouter.post('/new', appointmentCreate);

export { appointmentRouter };
