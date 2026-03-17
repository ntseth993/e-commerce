import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, DollarSign, TrendingUp, Users, Eye, Edit, Trash2, Plus, BarChart3, ShoppingBag, Star, AlertCircle, Download, Crown, Shield, Zap, CreditCard, CheckCircle, Clock } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'
import { useAnalytics } from '../context/AnalyticsContext'

const SellerDashboard = () => {
  const { addProduct } = useProducts()
  const { totalRevenue, totalOrders, totalCustomers, averageOrderValue, topSellingProducts, customerActivities } = useAnalytics()
  const [activeTab, setActiveTab] = useState('products')
  const [sellerProducts, setSellerProducts] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      stock: 45,
      sold: 89,
      status: 'active',
      views: 1234,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
      category: "Electronics",
      description: "High-quality wireless headphones with noise cancellation",
      sku: "WH-001"
    },
    {
      id: 2,
      name: "Laptop Ultra",
      price: 1899.99,
      stock: 12,
      sold: 23,
      status: 'active',
      views: 856,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200",
      category: "Electronics", 
      description: "Ultra-thin laptop with latest processor",
      sku: "LP-002"
    },
    {
      id: 3,
      name: "Gaming Mouse",
      price: 79.99,
      stock: 0,
      sold: 156,
      status: 'out_of_stock',
      views: 2341,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1527864550417-7fd9fc6a39af?w=200",
      category: "Electronics",
      description: "Precision gaming mouse with RGB lighting",
      sku: "GM-003"
    }
  ])

  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Electronics',
    description: '',
    image: ''
  })
  
  // Mock subscription data
  const subscription = {
    plan: 'Professional',
    status: 'active',
    startDate: '2024-01-15',
    nextBilling: '2024-04-15',
    features: ['Advanced analytics', 'Priority support', 'Marketing tools', '100 products'],
    usedProducts: sellerProducts.length,
    maxProducts: 100
  }

  // Real stats from analytics
  const stats = {
    totalRevenue: totalRevenue,
    totalOrders: totalOrders,
    totalProducts: sellerProducts.length,
    totalCustomers: totalCustomers,
    averageOrderValue: averageOrderValue,
    monthlyGrowth: 12.5,
    conversionRate: 3.2
  }

  const handleDeleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setSellerProducts(sellerProducts.filter(p => p.id !== id))
    }
  }

  const handleUpdateStock = (id: number, newStock: number) => {
    setSellerProducts(sellerProducts.map(p => 
      p.id === id ? { ...p, stock: newStock, status: newStock === 0 ? 'out_of_stock' : 'active' } : p
    ))
  }

  const handleEditProduct = (id: number) => {
    // Navigate to edit product page or open modal
    alert(`Edit product ${id} - This would open an edit form`)
  }

  const handleAddProduct = () => {
    setShowAddProductModal(true)
  }

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert('Please fill in all required fields')
      return
    }

    // Add product to global products context
    addProduct({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      category: newProduct.category,
      description: newProduct.description,
      image: newProduct.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      inStock: parseInt(newProduct.stock) > 0
    })

    // Also add to seller's local products for dashboard
    const productToAdd = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      sold: 0,
      status: 'active',
      views: 0,
      rating: 0,
      image: newProduct.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
      category: newProduct.category,
      description: newProduct.description,
      sku: `PRD-${Date.now().toString().slice(-6)}`
    }

    setSellerProducts([productToAdd, ...sellerProducts])
    setShowAddProductModal(false)
    setNewProduct({
      name: '',
      price: '',
      stock: '',
      category: 'Electronics',
      description: '',
      image: ''
    })
    alert('Product added successfully and is now available for customers!')
  }

  const orders = [
    {
      id: 'ORD-2024-1234',
      customer: 'John Doe',
      date: '2024-03-10',
      total: 299.99,
      status: 'delivered',
      items: 2
    },
    {
      id: 'ORD-2024-1235',
      customer: 'Jane Smith',
      date: '2024-03-10',
      total: 1899.99,
      status: 'processing',
      items: 1
    },
    {
      id: 'ORD-2024-1236',
      customer: 'Bob Johnson',
      date: '2024-03-09',
      total: 159.98,
      status: 'shipped',
      items: 3
    }
  ]

  const reviews = [
    {
      id: 1,
      product: "Premium Wireless Headphones",
      customer: 'John Doe',
      rating: 5,
      comment: "Excellent quality! Fast shipping and great customer service.",
      date: '2024-03-10',
      verified: true
    },
    {
      id: 2,
      product: "Laptop Ultra",
      customer: 'Sarah Wilson',
      rating: 4,
      comment: "Great laptop, exactly as described. Minor delay in shipping.",
      date: '2024-03-09',
      verified: true
    },
    {
      id: 3,
      product: "Gaming Mouse",
      customer: 'Mike Brown',
      rating: 5,
      comment: "Perfect for gaming! Responsive and comfortable.",
      date: '2024-03-08',
      verified: true
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'out_of_stock': return 'text-red-600 bg-red-100'
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'shipped': return 'text-blue-600 bg-blue-100'
      case 'processing': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Seller Dashboard</h1>
          <p className="text-gray-600">Manage your products, orders, and track your performance</p>
        </div>

        {/* Subscription Status Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Crown className="mr-3" size={24} />
              <div>
                <h2 className="text-xl font-bold">{subscription.plan} Plan</h2>
                <p className="text-purple-100">Active since {subscription.startDate}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-purple-100">Next Billing</div>
              <div className="text-lg font-semibold">{subscription.nextBilling}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {subscription.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <CheckCircle className="mr-2" size={16} />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-purple-400">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="mr-2" size={16} />
                <span className="text-sm">Products: {subscription.usedProducts}/{subscription.maxProducts}</span>
              </div>
              <Link
                to="/seller-subscription"
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <DollarSign className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600">+12.5% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Orders</h3>
              <Package className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.totalOrders}</p>
            <p className="text-sm text-blue-600">+8.3% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Products</h3>
              <ShoppingBag className="text-purple-600" size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.totalProducts}</p>
            <p className="text-sm text-gray-600">45 active, 3 inactive</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Average Rating</h3>
              <Star className="text-yellow-500" size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.averageRating}</p>
            <p className="text-sm text-gray-600">From 234 reviews</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <Users className="text-purple-600" size={32} />
                </div>
                <div>
                  <h3 className="font-semibold">TechStore Pro</h3>
                  <p className="text-sm text-gray-500">Verified Seller</p>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'overview' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 size={18} className="mr-3" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'products' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <ShoppingBag size={18} className="mr-3" />
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  Orders
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'reviews' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Star size={18} className="mr-3" />
                  Reviews
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'analytics' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <TrendingUp size={18} className="mr-3" />
                  Analytics
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">{stats.monthlyGrowth}%</p>
                      <p className="text-sm text-gray-600">Monthly Growth</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{stats.conversionRate}%</p>
                      <p className="text-sm text-gray-600">Conversion Rate</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">98.5%</p>
                      <p className="text-sm text-gray-600">Customer Satisfaction</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.customer} • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">My Products</h2>
                  <button onClick={handleAddProduct} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                    <Plus size={16} className="mr-2" />
                    Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Product</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">SKU</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Price</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Stock</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Sold</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sellerProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg mr-3"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.category}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-mono text-sm">{product.sku}</td>
                          <td className="py-4 px-4 font-medium">${product.price}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <span className="font-medium mr-2">{product.stock}</span>
                              <input
                                type="number"
                                value={product.stock}
                                onChange={(e) => handleUpdateStock(product.id, parseInt(e.target.value))}
                                className="w-20 px-2 py-1 border rounded text-sm"
                                min="0"
                              />
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium">{product.sold}</td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditProduct(product.id)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Order Management</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-gray-500">{order.customer} • {order.date}</p>
                          <p className="text-sm text-gray-500">{order.items} items</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${order.total}</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold mr-2">{review.product}</h3>
                            {review.verified && (
                              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{review.customer} • {review.date}</p>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'fill-current' : ''}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Customer Analytics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{totalCustomers}</div>
                      <div className="text-sm text-gray-600">Total Customers</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">${averageOrderValue.toFixed(2)}</div>
                      <div className="text-sm text-gray-600">Avg Order Value</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{customerActivities.length}</div>
                      <div className="text-sm text-gray-600">Active Customers</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{stats.monthlyGrowth}%</div>
                      <div className="text-sm text-gray-600">Monthly Growth</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Top Products</h2>
                  <div className="space-y-3">
                    {topSellingProducts.map((product, index) => (
                      <div key={product.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center">
                          <span className="text-lg font-bold mr-3">#{index + 1}</span>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.totalSold} sold</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${product.revenue.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">Revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Customer Activity</h2>
                  <div className="space-y-3">
                    {customerActivities.slice(0, 5).map((customer, index) => (
                      <div key={customer.customerId} className="flex justify-between items-center p-3 border rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <Users className="text-blue-600" size={16} />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{customer.customerName}</div>
                            <div className="text-sm text-gray-500">{customer.ordersCount} orders</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">${customer.totalSpent.toFixed(2)}</div>
                          <div className="text-sm text-gray-500">Total Spent</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  placeholder="Enter product name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Enter product description"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  placeholder="https://example.com/image.jpg (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  setShowAddProductModal(false)
                  setNewProduct({
                    name: '',
                    price: '',
                    stock: '',
                    category: 'Electronics',
                    description: '',
                    image: ''
                  })
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerDashboard
