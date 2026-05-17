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
    accessToken: string;
    user: User;
}

export interface RegisterDto {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

