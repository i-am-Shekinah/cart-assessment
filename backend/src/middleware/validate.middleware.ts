import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import {
  ZodError,
  type ZodSchema,
} from 'zod';

export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    errors: error.issues.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}