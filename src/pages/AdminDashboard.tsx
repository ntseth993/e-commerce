import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, ShoppingBag, DollarSign, Package, TrendingUp, AlertCircle, Settings, LogOut, BarChart3, Eye, Edit, Trash2, Shield, CheckCircle, XCircle, FileText } from 'lucide-react'
import { useAgreement } from '../context/AgreementContext'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const { getPendingAgreements } = useAgreement()
  const pendingAgreements = getPendingAgreements()

  const stats = {
    totalUsers: 15420,
    totalSellers: 156,
    totalProducts: 2340,
    totalOrders: 8967,
    totalRevenue: 1234567.89,
    pendingApprovals: 23,
    reportedIssues: 8,
    systemHealth: 99.2
  }

  const recentUsers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      joinDate: '2024-03-10',
      status: 'active',
      type: 'customer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      joinDate: '2024-03-09',
      status: 'active',
      type: 'seller'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@email.com',
      joinDate: '2024-03-08',
      status: 'pending',
      type: 'seller'
    }
  ]

  const pendingProducts = [
    {
      id: 1,
      name: 'Gaming Keyboard RGB',
      seller: 'TechStore Pro',
      price: 149.99,
      submittedDate: '2024-03-10',
      category: 'Electronics'
    },
    {
      id: 2,
      name: 'Yoga Mat Premium Plus',
      seller: 'FitGear',
      price: 69.99,
      submittedDate: '2024-03-09',
      category: 'Sports'
    },
    {
      id: 3,
      name: 'Designer Sunglasses Pro',
      seller: 'Shade Studio',
      price: 199.99,
      submittedDate: '2024-03-08',
      category: 'Fashion'
    }
  ]

  const reportedIssues = [
    {
      id: 1,
      type: 'product',
      title: 'Fake product listing',
      reporter: 'Customer123',
      seller: 'Unverified Seller',
      date: '2024-03-10',
      status: 'open',
      severity: 'high'
    },
    {
      id: 2,
      type: 'seller',
      title: 'Fraudulent seller activity',
      reporter: 'Customer456',
      seller: 'ScammerStore',
      date: '2024-03-09',
      status: 'investigating',
      severity: 'critical'
    },
    {
      id: 3,
      type: 'order',
      title: 'Order not delivered',
      reporter: 'Customer789',
      seller: 'TechStore Pro',
      date: '2024-03-08',
      status: 'resolved',
      severity: 'medium'
    }
  ]

  const systemMetrics = [
    { name: 'Server Uptime', value: '99.9%', status: 'good' },
    { name: 'Response Time', value: '245ms', status: 'good' },
    { name: 'Error Rate', value: '0.12%', status: 'good' },
    { name: 'Database Load', value: '67%', status: 'warning' },
    { name: 'Storage Used', value: '45%', status: 'good' }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'inactive': return 'text-gray-600 bg-gray-100'
      case 'open': return 'text-red-600 bg-red-100'
      case 'investigating': return 'text-orange-600 bg-orange-100'
      case 'resolved': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100'
      case 'high': return 'text-orange-600 bg-orange-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, sellers, products, and monitor system performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
              <Users className="text-blue-600" size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            <p className="text-sm text-green-600">+523 this week</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Sellers</h3>
              <ShoppingBag className="text-purple-600" size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.totalSellers}</p>
            <p className="text-sm text-green-600">+12 this week</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <DollarSign className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            <p className="text-sm text-green-600">+15.3% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">System Health</h3>
              <Shield className="text-green-600" size={20} />
            </div>
            <p className="text-2xl font-bold">{stats.systemHealth}%</p>
            <p className="text-sm text-green-600">All systems operational</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Settings className="text-red-600" size={32} />
                </div>
                <div>
                  <h3 className="font-semibold">Admin Panel</h3>
                  <p className="text-sm text-gray-500">System Administrator</p>
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
                  onClick={() => setActiveTab('users')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'users' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Users size={18} className="mr-3" />
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('sellers')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'sellers' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <ShoppingBag size={18} className="mr-3" />
                  Sellers
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'products' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Package size={18} className="mr-3" />
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'reports' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <AlertCircle size={18} className="mr-3" />
                  Reports
                </button>
                <button
                  onClick={() => setActiveTab('system')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'system' ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Settings size={18} className="mr-3" />
                  System
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
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/admin-agreement-management" className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 transition-colors relative">
                      <FileText className="mx-auto mb-2 text-purple-600" size={32} />
                      <p className="font-medium">Seller Agreements</p>
                      {pendingAgreements.length > 0 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                          {pendingAgreements.length}
                        </span>
                      )}
                    </Link>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
                      <Users className="mx-auto mb-2 text-purple-600" size={32} />
                      <p className="font-medium">Manage Users</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
                      <ShoppingBag className="mx-auto mb-2 text-purple-600" size={32} />
                      <p className="font-medium">Review Products</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 transition-colors">
                      <AlertCircle className="mx-auto mb-2 text-purple-600" size={32} />
                      <p className="font-medium">Handle Reports</p>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 border rounded-lg">
                      <CheckCircle className="text-green-600 mr-3" size={20} />
                      <div className="flex-1">
                        <p className="font-medium">New seller registration approved</p>
                        <p className="text-sm text-gray-500">Fashion Elite • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <Package className="text-blue-600 mr-3" size={20} />
                      <div className="flex-1">
                        <p className="font-medium">15 new products submitted for review</p>
                        <p className="text-sm text-gray-500">3 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 border rounded-lg">
                      <AlertCircle className="text-orange-600 mr-3" size={20} />
                      <div className="flex-1">
                        <p className="font-medium">High server load detected</p>
                        <p className="text-sm text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">User</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Join Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.type === 'seller' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {user.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">{user.joinDate}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-700">
                                <Eye size={16} />
                              </button>
                              <button className="text-green-600 hover:text-green-700">
                                <Edit size={16} />
                              </button>
                              <button className="text-red-600 hover:text-red-700">
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

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Product Approvals</h2>
                <div className="space-y-4">
                  {pendingProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Seller: {product.seller} • Category: {product.category}
                          </p>
                          <p className="text-sm text-gray-500">Submitted: {product.submittedDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">${product.price}</p>
                          <div className="flex gap-2 mt-2">
                            <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                              Approve
                            </button>
                            <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Reported Issues</h2>
                <div className="space-y-4">
                  {reportedIssues.map((issue) => (
                    <div key={issue.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="font-semibold mr-2">{issue.title}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                              {issue.severity}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            {issue.type} • {issue.reporter} • {issue.date}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                          Investigate
                        </button>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                          Resolve
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                          Close
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-6">System Metrics</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {systemMetrics.map((metric, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium">{metric.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            metric.status === 'good' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {metric.status}
                          </span>
                        </div>
                        <p className="text-2xl font-bold mt-2">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">System Actions</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <h3 className="font-medium mb-1">Clear Cache</h3>
                      <p className="text-sm text-gray-500">Clear system cache and temporary files</p>
                    </button>
                    <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <h3 className="font-medium mb-1">Backup Database</h3>
                      <p className="text-sm text-gray-500">Create a full database backup</p>
                    </button>
                    <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <h3 className="font-medium mb-1">Send Notifications</h3>
                      <p className="text-sm text-gray-500">Send system-wide notifications</p>
                    </button>
                    <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
                      <h3 className="font-medium mb-1">View Logs</h3>
                      <p className="text-sm text-gray-500">Access system logs and reports</p>
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

export default AdminDashboard
