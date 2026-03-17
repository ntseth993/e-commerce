import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface Notification {
  id: string
  userId: string
  type: 'agreement_approved' | 'agreement_rejected' | 'subscription_reminder' | 'general'
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
  actionText?: string
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void
  markAsRead: (notificationId: string) => void
  markAllAsRead: (userId: string) => void
  getUnreadCount: (userId: string) => number
  getUserNotifications: (userId: string) => Notification[]
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const storedNotifications = localStorage.getItem('notifications')
      if (storedNotifications) {
        return JSON.parse(storedNotifications)
      }
    } catch (error) {
      console.error('Error loading notifications from localStorage:', error)
    }
    
    // Fallback to default data if localStorage is empty or invalid
    return [
      // Sample notifications
      {
        id: 'notif-001',
        userId: 'seller-002',
        type: 'agreement_approved',
        title: 'Agreement Approved!',
        message: 'Your seller agreement has been approved. You can now proceed with subscription.',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        actionUrl: '/seller-subscription',
        actionText: 'Upgrade Plan'
      },
      {
        id: 'notif-002',
        userId: 'seller-003',
        type: 'general',
        title: 'Welcome to the Platform',
        message: 'Complete your seller profile to start selling.',
        read: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  })

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('notifications', JSON.stringify(notifications))
    } catch (error) {
      console.error('Error saving notifications to localStorage:', error)
    }
  }, [notifications])

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      read: false
    }

    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ))
  }

  const markAllAsRead = (userId: string) => {
    setNotifications(prev => prev.map(notification => 
      notification.userId === userId 
        ? { ...notification, read: true }
        : notification
    ))
  }

  const getUnreadCount = (userId: string): number => {
    return notifications.filter(n => n.userId === userId && !n.read).length
  }

  const getUserNotifications = (userId: string): Notification[] => {
    return notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      getUnreadCount,
      getUserNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  )
}
