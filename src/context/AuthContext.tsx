import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'customer' | 'seller' | 'admin'
  avatar?: string
  businessName?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  hasRole: (role: string) => boolean
  register: (userData: Omit<User, 'id'>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    try {
      // Simulate API call
      // In a real app, this would be an API call
      console.log('Login attempt:', { email, password, role })
      
      // Check if user exists in localStorage (for registered users)
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      const existingUser = storedUsers.find((user: any) => user.email === email && user.role === role)
      
      // Check hardcoded admin/seller credentials
      const hardcodedAuth = ((email === 'ntseth993@gmail.com' && password === 'admin123' && role === 'admin') ||
          (email === 'tuyishimegloire08@gmail.com' && password === 'seller123' && role === 'seller') ||
          (email === 'customer@demo.com' && password === 'demo123' && role === 'customer'))
      
      if (existingUser || hardcodedAuth) {
        const userData: User = {
          id: existingUser?.id || (email === 'ntseth993@gmail.com' ? 'admin-001' : 
                email === 'tuyishimegloire08@gmail.com' ? 'seller-002' : 'customer-001'),
          name: existingUser?.name || (email === 'ntseth993@gmail.com' ? 'Admin User' : 
                email === 'tuyishimegloire08@gmail.com' ? 'Gloire Tuyishime' : 'Customer User'),
          email,
          role: role as 'customer' | 'seller' | 'admin',
          businessName: existingUser?.businessName || (email === 'tuyishimegloire08@gmail.com' ? 'Gloire Enterprises' : undefined)
        }
        
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    try {
      // Get existing users
      const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
      
      // Check if user already exists
      const existingUser = storedUsers.find((user: any) => user.email === userData.email)
      if (existingUser) {
        console.error('User already exists:', userData.email)
        return false
      }
      
      // Create new user with unique ID
      const newUser: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...userData
      }
      
      // Save to localStorage
      storedUsers.push(newUser)
      localStorage.setItem('registeredUsers', JSON.stringify(storedUsers))
      
      console.log('User registered successfully:', newUser)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('user')
  }

  const hasRole = (role: string): boolean => {
    return user?.role === role
  }

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
