import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface Order {
  id: string
  customerId: string
  customerName: string
  products: {
    id: number
    name: string
    price: number
    quantity: number
  }[]
  total: number
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentMethod: 'paypal' | 'mtn' | 'card'
}

interface CustomerActivity {
  customerId: string
  customerName: string
  totalSpent: number
  ordersCount: number
  lastOrderDate: string
  favoriteCategory: string
}

interface AnalyticsContextType {
  orders: Order[]
  customerActivities: CustomerActivity[]
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  averageOrderValue: number
  topSellingProducts: Array<{
    id: number
    name: string
    totalSold: number
    revenue: number
  }>
  addOrder: (order: Omit<Order, 'id'>) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  getCustomerStats: () => CustomerActivity[]
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider')
  }
  return context
}

interface AnalyticsProviderProps {
  children: ReactNode
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([
    // Sample initial orders
    {
      id: 'ORD-001',
      customerId: 'cust-001',
      customerName: 'John Doe',
      products: [
        { id: 1, name: 'Premium Wireless Headphones', price: 299.99, quantity: 1 },
        { id: 2, name: 'Smart Watch Pro', price: 449.99, quantity: 1 }
      ],
      total: 749.98,
      date: '2024-03-10',
      status: 'delivered',
      paymentMethod: 'paypal'
    },
    {
      id: 'ORD-002',
      customerId: 'cust-002',
      customerName: 'Sarah Miller',
      products: [
        { id: 3, name: 'Professional Camera', price: 1299.99, quantity: 1 }
      ],
      total: 1299.99,
      date: '2024-03-11',
      status: 'shipped',
      paymentMethod: 'mtn'
    },
    {
      id: 'ORD-003',
      customerId: 'cust-001',
      customerName: 'John Doe',
      products: [
        { id: 2, name: 'Smart Watch Pro', price: 449.99, quantity: 2 }
      ],
      total: 899.98,
      date: '2024-03-12',
      status: 'processing',
      paymentMethod: 'card'
    }
  ])

  const [customerActivities, setCustomerActivities] = useState<CustomerActivity[]>([])

  // Calculate customer activities whenever orders change
  useEffect(() => {
    const activities: { [key: string]: CustomerActivity } = {}
    
    orders.forEach(order => {
      if (!activities[order.customerId]) {
        activities[order.customerId] = {
          customerId: order.customerId,
          customerName: order.customerName,
          totalSpent: 0,
          ordersCount: 0,
          lastOrderDate: order.date,
          favoriteCategory: ''
        }
      }
      
      activities[order.customerId].totalSpent += order.total
      activities[order.customerId].ordersCount += 1
      
      if (new Date(order.date) > new Date(activities[order.customerId].lastOrderDate)) {
        activities[order.customerId].lastOrderDate = order.date
      }
      
      // Calculate favorite category
      const categories: { [key: string]: number } = {}
      order.products.forEach(product => {
        // This would come from product data, for now using a simple categorization
        const category = product.name.includes('Headphones') ? 'Electronics' :
                        product.name.includes('Watch') ? 'Electronics' :
                        product.name.includes('Camera') ? 'Electronics' : 'Other'
        categories[category] = (categories[category] || 0) + 1
      })
      
      const topCategory = Object.entries(categories).reduce((a, b) => 
        categories[a[0]] > categories[b[0]] ? a : b, ['', 0])[0]
      
      if (!activities[order.customerId].favoriteCategory || 
          categories[topCategory] > (categories[activities[order.customerId].favoriteCategory] || 0)) {
        activities[order.customerId].favoriteCategory = topCategory
      }
    })
    
    setCustomerActivities(Object.values(activities))
  }, [orders])

  const totalRevenue = orders.reduce((sum, order) => 
    order.status !== 'cancelled' ? sum + order.total : sum, 0)
  
  const totalOrders = orders.filter(order => order.status !== 'cancelled').length
  
  const totalCustomers = new Set(orders.map(order => order.customerId)).size
  
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  // Calculate top selling products
  const productSales: { [key: number]: { name: string; totalSold: number; revenue: number } } = {}
  
  orders.forEach(order => {
    if (order.status !== 'cancelled') {
      order.products.forEach(product => {
        if (!productSales[product.id]) {
          productSales[product.id] = {
            name: product.name,
            totalSold: 0,
            revenue: 0
          }
        }
        productSales[product.id].totalSold += product.quantity
        productSales[product.id].revenue += product.price * product.quantity
      })
    }
  })

  const topSellingProducts = Object.entries(productSales)
    .map(([id, data]) => ({
      id: parseInt(id),
      ...data
    }))
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5)

  const addOrder = (orderData: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`
    }
    setOrders(prevOrders => [newOrder, ...prevOrders])
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    )
  }

  const getCustomerStats = () => customerActivities

  return (
    <AnalyticsContext.Provider value={{
      orders,
      customerActivities,
      totalRevenue,
      totalOrders,
      totalCustomers,
      averageOrderValue,
      topSellingProducts,
      addOrder,
      updateOrderStatus,
      getCustomerStats
    }}>
      {children}
    </AnalyticsContext.Provider>
  )
}
