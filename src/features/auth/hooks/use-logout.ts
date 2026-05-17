import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../store/auth.store'

export const useLogout = () => {
  const navigate = useNavigate()

  const logout = useAuthStore(
    (state) => state.logout
  )

  return () => {
    logout()

    navigate('/login')
  }
}