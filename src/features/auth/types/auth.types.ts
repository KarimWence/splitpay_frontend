export interface LoginDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface RegisterDto {
    name: string;
    lastName: string;
    email: string;
    password: string;
}

export interface PublicUser {
    id: string
    email: string
    name: string
    lastName: string
    role: string
}