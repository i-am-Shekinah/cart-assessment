import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from '../types/auth';
import API from './axios';

export const register = async (data: RegisterPayload): Promise<AuthResponse> => {
  const res = await API.post('/auth/register', data);

  return res.data.data;
}

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
    const res = await API.post('/auth/login', data);
    
    return res.data.data;
}