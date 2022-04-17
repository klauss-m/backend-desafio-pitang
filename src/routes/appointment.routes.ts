import { Router } from 'express';
import {
  appointmentCreate,
  appointmentsList,
  appointmentUpdate,
} from '../controllers/appointment.controller';

const appointmentRouter = Router();

appointmentRouter.get('/', appointmentsList);
appointmentRouter.post('/new', appointmentCreate);
appointmentRouter.patch('/:id', appointmentUpdate);

export { appointmentRouter };
