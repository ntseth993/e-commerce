import { useState } from 'react'
import { Bell, CheckCircle, XCircle, AlertCircle, Info, X, ExternalLink } from 'lucide-react'
import { useNotification, Notification } from '../context/NotificationContext'

interface NotificationItemProps {
  notification: Notification
  onClose: () => void
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onClose }) => {
  const { markAsRead } = useNotification()

  const getIcon = () => {
    switch (notification.type) {
      case 'agreement_approved':
        return <CheckCircle className="text-green-600" size={20} />
      case 'agreement_rejected':
        return <XCircle className="text-red-600" size={20} />
      case 'subscription_reminder':
        return <AlertCircle className="text-orange-600" size={20} />
      default:
        return <Info className="text-blue-600" size={20} />
    }
  }

  const getBgColor = () => {
    switch (notification.type) {
      case 'agreement_approved':
        return 'bg-green-50 border-green-200'
      case 'agreement_rejected':
        return 'bg-red-50 border-red-200'
      case 'subscription_reminder':
        return 'bg-orange-50 border-orange-200'
      default:
        return 'bg-blue-50 border-blue-200'
    }
  }

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
    onClose()
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className={`p-4 border rounded-lg ${getBgColor()} ${!notification.read ? 'border-l-4' : ''}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {notification.title}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
              {notification.actionUrl && (
                <button
                  onClick={handleClick}
                  className="mt-2 text-sm font-medium text-purple-600 hover:text-purple-700 flex items-center"
                >
                  {notification.actionText || 'View Details'}
                  <ExternalLink size={14} className="ml-1" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                if (!notification.read) markAsRead(notification.id)
                onClose()
              }}
              className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
            >
              <X size={16} />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {formatTime(notification.createdAt)}
          </p>
        </div>
      </div>
    </div>
  )
}

interface NotificationDropdownProps {
  userId: string
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false)
  const { getUserNotifications, getUnreadCount, markAllAsRead } = useNotification()
  
  const notifications = getUserNotifications(userId)
  const unreadCount = getUnreadCount(userId)

  const handleMarkAllAsRead = () => {
    markAllAsRead(userId)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="text-gray-400 mx-auto mb-4" size={32} />
                  <p className="text-gray-600">No notifications</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onClose={() => setIsOpen(false)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default NotificationDropdown
