import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { loginRequest } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';

export const useLogin = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            setAuth(data)
            toast.success('Login successful!');
            navigate('/dashboard');
        },
        onError: () => {
            toast.error('Invalid credentials.')
        },
    });
}