import type {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

import type { CustomJwtPayload } from '../modules/auth/auth.types.js';

export const protect = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'Authorization header missing',
        })
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token missing',
        })
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
        req.user = decoded;

        return next();
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
}