import { useMutation } from '@tanstack/react-query'

import { bootstrapRequest } from '../api/sync.api'

import { saveBootstrapData } from '../services/sync.service'

export const useBootstrap =
    () => {
        return useMutation({
            mutationFn:
                bootstrapRequest,

            onSuccess:
                saveBootstrapData,
        })
    }