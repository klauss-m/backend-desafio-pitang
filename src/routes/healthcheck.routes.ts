import { Request, Response, Router } from 'express';

const healthcheckRouter = Router();

healthcheckRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'ok' });
});

export { healthcheckRouter };
