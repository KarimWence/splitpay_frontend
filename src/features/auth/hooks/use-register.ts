import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { registerRequest } from '../api/auth.api';
import { useAuthStore } from '../store/auth.store';

export const useRegister = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation({
        mutationFn: registerRequest,

        onSuccess: (data) => {
            setAuth(data);
            toast.success('Registration successful!');
            navigate('/dashboard');
        },

        onError: () => {
            toast.error('Registration failed. Please try again.');
        },
    })
}