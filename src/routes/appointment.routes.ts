import { Router } from 'express';
import { appointmentsList } from '../controllers/get-appointment.controller';
import { appointmentUpdate } from '../controllers/patch-appointment.controller';
import { appointmentCreate } from '../controllers/post-appointment.controller';

const appointmentRouter = Router();

appointmentRouter.get('/', appointmentsList);
appointmentRouter.post('/new', appointmentCreate);
appointmentRouter.patch('/:id', appointmentUpdate);

export { appointmentRouter };
