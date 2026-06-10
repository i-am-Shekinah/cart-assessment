import { toTitleCase } from '../../utils/format-name.js';
import {
  comparePassword,
  hashPassword,
} from '../../utils/hash.js';
import { generateToken } from '../../utils/jwt.js';
import { User } from './auth.model.js';
import type {
  LoginDto,
  RegisterDto,
} from './auth.validation.js';

export class AuthService {
    
    async register(registerDto: RegisterDto) {
        let { firstName, lastName, email, username, password } = registerDto;

        firstName = toTitleCase(firstName);
        lastName = toTitleCase(lastName);
        email = email.toLowerCase().trim();
        username = username.toLowerCase().trim();

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                throw new Error('Email already in use');
            }

            if (existingUser.username === username) {
                throw new Error('Username already in use');
            }
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        });

        const token = generateToken({
            userId: user._id.toString(),
            username: user.username
        });

        const { password: _, ...safeUser } = user.toObject();

        return { user: safeUser, token }
    }

    async login(loginDto: LoginDto) {
        let { username, password } = loginDto;

        username = username.toLowerCase().trim();

        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = generateToken({ userId: user._id.toString(), username: user.username });

        const { password: _, ...safeUser } = user.toObject();

        return { user: safeUser, token };
    }
}