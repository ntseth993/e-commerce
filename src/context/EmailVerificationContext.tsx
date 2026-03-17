import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { emailService } from '../services/emailService'
import { useAuth } from './AuthContext'

export interface EmailVerification {
  email: string
  verified: boolean
  verificationCode?: string
  expiresAt?: string
}

interface EmailVerificationContextType {
  verifications: EmailVerification[]
  generateVerificationCode: (email: string) => string
  verifyEmail: (email: string, code: string) => boolean
  isEmailVerified: (email: string) => boolean
  markEmailAsVerified: (email: string) => void
  clearExpiredVerifications: () => void
}

const EmailVerificationContext = createContext<EmailVerificationContextType | undefined>(undefined)

export const useEmailVerification = () => {
  const context = useContext(EmailVerificationContext)
  if (!context) {
    throw new Error('useEmailVerification must be used within an EmailVerificationProvider')
  }
  return context
}

interface EmailVerificationProviderProps {
  children: ReactNode
}

export const EmailVerificationProvider: React.FC<EmailVerificationProviderProps> = ({ children }) => {
  const [verifications, setVerifications] = useState<EmailVerification[]>(() => {
    try {
      const storedVerifications = localStorage.getItem('emailVerifications')
      if (storedVerifications) {
        return JSON.parse(storedVerifications)
      }
    } catch (error) {
      console.error('Error loading email verifications from localStorage:', error)
    }
    
    // Fallback to default data if localStorage is empty or invalid
    return [
      // Sample verified emails
      {
        email: 'tuyishimegloire08@gmail.com',
        verified: true,
        expiresAt: '2024-12-31T23:59:59.999Z'
      }
    ]
  })
  const { user } = useAuth()

  // Helper function to get user name
  const getUserName = (email: string): string => {
    // Check if it's the current logged-in user
    if (user && user.email === email) {
      return user.name
    }
    
    // Check registered users in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const registeredUser = registeredUsers.find((u: any) => u.email === email)
    if (registeredUser) {
      return registeredUser.name
    }
    
    // Fallback to hardcoded users
    if (email === 'tuyishimegloire08@gmail.com') return 'Gloire'
    if (email === 'ntseth993@gmail.com') return 'Admin'
    
    // Extract name from email as last resort
    return email.split('@')[0]
  }

  // Save verifications to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('emailVerifications', JSON.stringify(verifications))
    } catch (error) {
      console.error('Error saving email verifications to localStorage:', error)
    }
  }, [verifications])

  const generateVerificationCode = (email: string): string => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes expiry
    
    const newVerification: EmailVerification = {
      email,
      verified: false,
      verificationCode: code,
      expiresAt
    }

    setVerifications(prev => {
      const filtered = prev.filter(v => v.email !== email)
      return [newVerification, ...filtered]
    })

    // Send real email with OTP code
    emailService.sendOTPEmail({
      email,
      code,
      userName: getUserName(email) // Get user name for any registered user
    }).then(success => {
      if (success) {
        console.log(`✅ OTP email sent successfully to ${email}`)
      } else {
        console.error(`❌ Failed to send OTP email to ${email}`)
      }
    })
    
    return code
  }

  const verifyEmail = (email: string, code: string): boolean => {
    const verification = verifications.find(v => v.email === email)
    
    if (!verification || verification.verified) {
      return false
    }

    if (verification.verificationCode !== code) {
      return false
    }

    if (verification.expiresAt && new Date(verification.expiresAt) < new Date()) {
      return false
    }

    // Mark as verified
    markEmailAsVerified(email)
    return true
  }

  const isEmailVerified = (email: string): boolean => {
    const verification = verifications.find(v => v.email === email)
    return verification?.verified || false
  }

  const markEmailAsVerified = (email: string) => {
    setVerifications(prev => prev.map(v => 
      v.email === email 
        ? { ...v, verified: true, verificationCode: 'VERIFIED' }
        : v
    ))
  }

  const clearExpiredVerifications = () => {
    setVerifications(prev => prev.filter(v => 
      !v.expiresAt || new Date(v.expiresAt) >= new Date()
    ))
  }

  // Auto-clear expired verifications every minute
  useEffect(() => {
    const interval = setInterval(clearExpiredVerifications, 60000) // 1 minute
    return () => clearInterval(interval)
  }, [])

  return (
    <EmailVerificationContext.Provider value={{
      verifications,
      generateVerificationCode,
      verifyEmail,
      isEmailVerified,
      markEmailAsVerified,
      clearExpiredVerifications
    }}>
      {children}
    </EmailVerificationContext.Provider>
  )
}
