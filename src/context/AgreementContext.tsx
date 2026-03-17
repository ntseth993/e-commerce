import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useNotification } from './NotificationContext'
import { useEmailVerification } from './EmailVerificationContext'
import { emailService } from '../services/emailService'

export interface Agreement {
  id: string
  sellerId: string
  sellerName: string
  sellerEmail: string
  businessName?: string
  tinNumber?: string
  businessDocuments?: {
    idDocument?: string
    businessLicense?: string
    taxCertificate?: string
  }
  adminId: string
  adminName: string
  status: 'pending' | 'approved' | 'rejected' | 'expired'
  terms: {
    commissionRate: number
    paymentSchedule: string
    productLimit: number
    supportLevel: string
    duration: string
  }
  createdAt: string
  approvedAt?: string
  expiresAt?: string
  sellerSignature?: string
  adminSignature?: string
}

interface AgreementContextType {
  agreements: Agreement[]
  createAgreement: (sellerData: {
    sellerId: string
    sellerName: string
    sellerEmail: string
    businessName?: string
    tinNumber?: string
    businessDocuments?: {
      idDocument?: string
      businessLicense?: string
      taxCertificate?: string
    }
    terms: Agreement['terms']
  }) => void
  approveAgreement: (agreementId: string, adminId: string) => void
  rejectAgreement: (agreementId: string, adminId: string, reason?: string) => void
  getSellerAgreement: (sellerId: string) => Agreement | null
  getPendingAgreements: () => Agreement[]
  isAgreementActive: (sellerId: string) => boolean
}

const AgreementContext = createContext<AgreementContextType | undefined>(undefined)

export const useAgreement = () => {
  const context = useContext(AgreementContext)
  if (!context) {
    throw new Error('useAgreement must be used within an AgreementProvider')
  }
  return context
}

interface AgreementProviderProps {
  children: ReactNode
}

export const AgreementProvider: React.FC<AgreementProviderProps> = ({ children }) => {
  const { addNotification } = useNotification()
  const { isEmailVerified } = useEmailVerification()
  
  // Load agreements from localStorage on initial render
  const [agreements, setAgreements] = useState<Agreement[]>(() => {
    try {
      const storedAgreements = localStorage.getItem('agreements')
      if (storedAgreements) {
        return JSON.parse(storedAgreements)
      }
    } catch (error) {
      console.error('Error loading agreements from localStorage:', error)
    }
    
    // Fallback to default data if localStorage is empty or invalid
    return [
      // Sample pending agreements
      {
        id: 'AGR-002',
        sellerId: 'seller-002',
        sellerName: 'Jane Smith',
        sellerEmail: 'jane@example.com',
        businessName: 'Smith Enterprises',
        tinNumber: 'TIN-123456789',
        businessDocuments: {
          idDocument: 'blob:sample-id-doc',
          businessLicense: 'blob:sample-business-license',
          taxCertificate: 'blob:sample-tax-certificate'
        },
        adminId: 'pending',
        adminName: 'Pending Admin',
        status: 'pending',
        terms: {
          commissionRate: 7,
          paymentSchedule: 'monthly',
          productLimit: 150,
          supportLevel: 'premium',
          duration: '12 months'
        },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'AGR-003',
        sellerId: 'seller-003',
        sellerName: 'Bob Johnson',
        sellerEmail: 'bob@example.com',
        businessName: 'Johnson Tech Solutions',
        tinNumber: 'TIN-987654321',
        businessDocuments: {
          idDocument: 'blob:sample-id-doc-2',
          businessLicense: 'blob:sample-business-license-2'
        },
        adminId: 'pending',
        adminName: 'Pending Admin',
        status: 'pending',
        terms: {
          commissionRate: 5,
          paymentSchedule: 'weekly',
          productLimit: 200,
          supportLevel: 'standard',
          duration: '6 months'
        },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        expiresAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString()
      },
      // Sample approved agreement
      {
        id: 'AGR-001',
        sellerId: 'seller-001',
        sellerName: 'John Seller',
        sellerEmail: 'john@example.com',
        businessName: 'John\'s Store',
        tinNumber: 'TIN-555666777',
        businessDocuments: {
          idDocument: 'blob:approved-id-doc',
          businessLicense: 'blob:approved-business-license',
          taxCertificate: 'blob:approved-tax-certificate'
        },
        adminId: 'admin-001',
        adminName: 'Admin User',
        status: 'approved',
        terms: {
          commissionRate: 5,
          paymentSchedule: 'monthly',
          productLimit: 100,
          supportLevel: 'premium',
          duration: '12 months'
        },
        createdAt: '2024-01-15',
        approvedAt: '2024-01-16',
        expiresAt: '2025-01-15',
        sellerSignature: 'John Seller',
        adminSignature: 'Admin User'
      }
    ]
  })

  // Save agreements to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('agreements', JSON.stringify(agreements))
    } catch (error) {
      console.error('Error saving agreements to localStorage:', error)
    }
  }, [agreements])

  const createAgreement = (sellerData: {
    sellerId: string
    sellerName: string
    sellerEmail: string
    businessName?: string
    tinNumber?: string
    businessDocuments?: {
      idDocument?: string
      businessLicense?: string
      taxCertificate?: string
    }
    terms: Agreement['terms']
  }) => {
    const newAgreement: Agreement = {
      id: `AGR-${Date.now()}`,
      sellerId: sellerData.sellerId,
      sellerName: sellerData.sellerName,
      sellerEmail: sellerData.sellerEmail,
      businessName: sellerData.businessName,
      tinNumber: sellerData.tinNumber,
      businessDocuments: sellerData.businessDocuments,
      adminId: 'pending',
      adminName: 'Pending Admin',
      status: 'pending',
      terms: sellerData.terms,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
    }

    setAgreements(prev => [newAgreement, ...prev])
  }

  const approveAgreement = (agreementId: string, adminId: string) => {
    const agreement = agreements.find(a => a.id === agreementId)
    
    setAgreements(prevAgreements => prevAgreements.map(agreement => 
      agreement.id === agreementId
        ? {
            ...agreement,
            status: 'approved',
            adminId,
            adminName: 'Current Admin',
            approvedAt: new Date().toISOString(),
            adminSignature: 'Current Admin'
          }
        : agreement
    ))

    // Send notification to seller
    if (agreement) {
      addNotification({
        userId: agreement.sellerId,
        type: 'agreement_approved',
        title: 'Agreement Approved!',
        message: `Your seller agreement for ${agreement.businessName || 'your business'} has been approved. Please verify your email to proceed with subscription.`,
        actionUrl: '/email-verification',
        actionText: 'Verify Email'
      })

      // Send real email notification
      emailService.sendAgreementApprovalEmail(
        agreement.sellerEmail,
        agreement.sellerName,
        agreement.businessName
      ).then(success => {
        if (success) {
          console.log(`✅ Agreement approval email sent to ${agreement.sellerEmail}`)
        } else {
          console.error(`❌ Failed to send agreement approval email to ${agreement.sellerEmail}`)
        }
      })
    }

    // Simulate sending email notification
    console.log(`Email notification sent to seller: Agreement ${agreementId} has been approved!`)
  }

  const rejectAgreement = (agreementId: string, adminId: string, reason?: string) => {
    const agreement = agreements.find(a => a.id === agreementId)
    
    setAgreements(prevAgreements => prevAgreements.map(agreement => 
      agreement.id === agreementId
        ? {
            ...agreement,
            status: 'rejected',
            adminId,
            adminName: 'Current Admin'
          }
        : agreement
    ))

    // Send notification to seller
    if (agreement) {
      addNotification({
        userId: agreement.sellerId,
        type: 'agreement_rejected',
        title: 'Agreement Rejected',
        message: `Your seller agreement for ${agreement.businessName || 'your business'} has been rejected. ${reason ? `Reason: ${reason}` : 'Please contact support for more information.'}`,
        actionUrl: '/seller-agreement',
        actionText: 'Resubmit Agreement'
      })

      // Send real email notification
      emailService.sendAgreementRejectionEmail(
        agreement.sellerEmail,
        agreement.sellerName,
        reason
      ).then(success => {
        if (success) {
          console.log(`✅ Agreement rejection email sent to ${agreement.sellerEmail}`)
        } else {
          console.error(`❌ Failed to send agreement rejection email to ${agreement.sellerEmail}`)
        }
      })
    }

    // Simulate sending email notification
    console.log(`Email notification sent to seller: Agreement ${agreementId} has been rejected. Reason: ${reason}`)
  }

  const getSellerAgreement = (sellerId: string): Agreement | null => {
    const agreement = agreements.find(a => a.sellerId === sellerId)
    return agreement || null
  }

  const getPendingAgreements = (): Agreement[] => {
    return agreements.filter(a => a.status === 'pending')
  }

  const isAgreementActive = (sellerId: string): boolean => {
    const agreement = getSellerAgreement(sellerId)
    if (!agreement) return false
    
    if (agreement.status !== 'approved') return false
    
    // Check if seller's email is verified
    if (!isEmailVerified(agreement.sellerEmail)) return false
    
    const now = new Date()
    const expiryDate = new Date(agreement.expiresAt || '')
    
    return agreement.status === 'approved' && now < expiryDate && isEmailVerified(agreement.sellerEmail)
  }

  return (
    <AgreementContext.Provider value={{
      agreements,
      createAgreement,
      approveAgreement,
      rejectAgreement,
      getSellerAgreement,
      getPendingAgreements,
      isAgreementActive
    }}>
      {children}
    </AgreementContext.Provider>
  )
}
