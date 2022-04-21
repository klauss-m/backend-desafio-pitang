import { NextFunction, Request, Response } from 'express';

interface Error {
  status: number;
  message: string;
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err.status === 500) {
    return res.status(500).json({ message: err.message });
  }
  return next();
}
