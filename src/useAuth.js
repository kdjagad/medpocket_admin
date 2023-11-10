import { createContext, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from './useLocalStorage'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', null)
  const navigate = useNavigate()

  // call this function when you want to authenticate the token
  const login = async (data) => {
    setToken(data)
    navigate('/dashboard')
  }

  // call this function to sign out logged in token
  const logout = () => {
    setToken(null)
    navigate('/login', { replace: true })
  }

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token],
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
