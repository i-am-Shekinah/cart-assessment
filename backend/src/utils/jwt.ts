import jwt from 'jsonwebtoken';

export const generateToken = ({ userId, username }: { userId: string, username: string }) => {
    const secretKey = process.env.JWT_SECRET as string;

    if (!secretKey) {
        throw new Error('JWT secret key is not defined in environment variables');
    }
    
    return jwt.sign({ userId, username }, secretKey, { expiresIn: '1h' });
}