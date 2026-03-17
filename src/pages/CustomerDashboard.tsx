import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, ShoppingBag, Heart, Package, CreditCard, MapPin, Settings, LogOut, Eye, Download, AlertCircle } from 'lucide-react'

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState('orders')

  const orders = [
    {
      id: 'ORD-2024-1234',
      date: '2024-03-10',
      status: 'delivered',
      total: 299.99,
      items: 2,
      tracking: '1Z999AA1234567890'
    },
    {
      id: 'ORD-2024-1235',
      date: '2024-03-08',
      status: 'shipped',
      total: 189.99,
      items: 1,
      tracking: '1Z999AA1234567891'
    },
    {
      id: 'ORD-2024-1236',
      date: '2024-03-05',
      status: 'processing',
      total: 449.99,
      items: 3,
      tracking: null
    }
  ]

  const wishlist = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
      seller: "TechStore Pro"
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
      seller: "Gadget World"
    },
    {
      id: 3,
      name: "Designer Leather Bag",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
      seller: "Fashion Elite"
    }
  ]

  const addresses = [
    {
      id: 1,
      type: 'Home',
      name: 'John Doe',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      name: 'John Doe',
      address: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      country: 'United States',
      isDefault: false
    }
  ]

  const paymentMethods = [
    {
      id: 1,
      type: 'credit',
      last4: '1234',
      brand: 'Visa',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'credit',
      last4: '5678',
      brand: 'Mastercard',
      expiryDate: '09/24',
      isDefault: false
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'shipped': return 'text-blue-600 bg-blue-100'
      case 'processing': return 'text-yellow-600 bg-yellow-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-gray-600">Manage your orders, wishlist, and account settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <User className="text-purple-600" size={32} />
                </div>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-500">john.doe@email.com</p>
                </div>
              </div>

              <nav className="space-y-2">
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
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'wishlist' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'addresses' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <MapPin size={18} className="mr-3" />
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'payment' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <CreditCard size={18} className="mr-3" />
                  Payment Methods
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  Settings
                </button>
                <button className="w-full flex items-center px-4 py-2 rounded-lg hover:bg-gray-50 text-red-600">
                  <LogOut size={18} className="mr-3" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{order.id}</h3>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">{order.items} items</p>
                          <p className="font-semibold">${order.total}</p>
                        </div>
                        <div className="flex gap-2">
                          {order.tracking && (
                            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                              Track Order
                            </button>
                          )}
                          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{item.seller}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-purple-600">${item.price}</span>
                        <div className="flex gap-2">
                          <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                            <Heart size={16} fill="currentColor" />
                          </button>
                          <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            <ShoppingBag size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Shipping Addresses</h2>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Add New Address
                  </button>
                </div>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="font-semibold mr-2">{address.type}</h3>
                            {address.isDefault && (
                              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="font-medium">{address.name}</p>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p className="text-gray-600">{address.country}</p>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-purple-600 hover:text-purple-700 text-sm">
                            Edit
                          </button>
                          {!address.isDefault && (
                            <button className="text-red-600 hover:text-red-700 text-sm">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Payment Methods</h2>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Add Payment Method
                  </button>
                </div>
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <CreditCard className="mr-3 text-gray-400" size={20} />
                          <div>
                            <p className="font-medium">
                              {method.brand} ending in {method.last4}
                            </p>
                            <p className="text-sm text-gray-500">Expires {method.expiryDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {method.isDefault && (
                            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                          <button className="text-purple-600 hover:text-purple-700 text-sm">
                            Edit
                          </button>
                          {!method.isDefault && (
                            <button className="text-red-600 hover:text-red-700 text-sm">
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Personal Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          defaultValue="John"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          defaultValue="Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="john.doe@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+1-555-0123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span>Email notifications for orders</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span>Email notifications for promotions</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3" />
                        <span>SMS notifications for delivery updates</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                      Save Changes
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerDashboard
