import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
	console.log('Time:', Date.now());
	console.log('Request Type:', req.method);
	console.log('Request URL:', req.originalUrl);
	next();
	return;
};
