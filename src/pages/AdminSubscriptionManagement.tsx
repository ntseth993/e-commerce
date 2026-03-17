import { useState } from 'react'
import { Check, X, Eye, Clock, DollarSign, Users, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

interface Subscription {
  id: string
  sellerName: string
  sellerEmail: string
  plan: string
  amount: string
  status: 'pending' | 'approved' | 'rejected'
  paymentDate: string
  paypalTransactionId: string
  features: string[]
}

const AdminSubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      sellerName: 'John Electronics',
      sellerEmail: 'john@electronics.com',
      plan: 'Professional',
      amount: '$29.00',
      status: 'pending',
      paymentDate: '2024-03-13',
      paypalTransactionId: 'PAYPAL-123456789',
      features: ['Advanced analytics', 'Priority support', 'Marketing tools']
    },
    {
      id: '2',
      sellerName: 'Sarah Fashion',
      sellerEmail: 'sarah@fashion.com',
      plan: 'Enterprise',
      amount: '$249.00',
      status: 'approved',
      paymentDate: '2024-03-12',
      paypalTransactionId: 'PAYPAL-987654321',
      features: ['Unlimited products', 'API access', 'Custom branding']
    },
    {
      id: '3',
      sellerName: 'Mike Sports',
      sellerEmail: 'mike@sports.com',
      plan: 'Free',
      amount: '$0.00',
      status: 'approved',
      paymentDate: '2024-03-11',
      paypalTransactionId: 'FREE-PLAN',
      features: ['Basic listings', 'Standard support']
    }
  ])

  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  const handleApprove = (id: string) => {
    setSubscriptions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, status: 'approved' as const } : sub
      )
    )
  }

  const handleReject = (id: string) => {
    setSubscriptions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, status: 'rejected' as const } : sub
      )
    )
  }

  const filteredSubscriptions = subscriptions.filter(sub => 
    filter === 'all' ? true : sub.status === filter
  )

  const stats = {
    total: subscriptions.length,
    pending: subscriptions.filter(s => s.status === 'pending').length,
    approved: subscriptions.filter(s => s.status === 'approved').length,
    rejected: subscriptions.filter(s => s.status === 'rejected').length,
    totalRevenue: subscriptions
      .filter(s => s.status === 'approved')
      .reduce((sum, s) => sum + parseFloat(s.amount.replace('$', '')), 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscription Management</h1>
          <p className="text-gray-600">Manage seller subscriptions and approve payments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Subscriptions</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="text-blue-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Approval</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="text-orange-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="text-green-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <X className="text-red-500" size={24} />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {[
              { key: 'all', label: 'All Subscriptions', count: stats.total },
              { key: 'pending', label: 'Pending', count: stats.pending },
              { key: 'approved', label: 'Approved', count: stats.approved },
              { key: 'rejected', label: 'Rejected', count: stats.rejected }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as any)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filter === tab.key
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Subscriptions Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Seller</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Plan</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Payment Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Transaction ID</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-gray-900">{subscription.sellerName}</div>
                        <div className="text-sm text-gray-500">{subscription.sellerEmail}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        subscription.plan === 'Free' ? 'bg-gray-100 text-gray-700' :
                        subscription.plan === 'Professional' ? 'bg-purple-100 text-purple-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {subscription.plan}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-900">{subscription.amount}</td>
                    <td className="py-4 px-6 text-gray-600">{subscription.paymentDate}</td>
                    <td className="py-4 px-6">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {subscription.paypalTransactionId}
                      </code>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        subscription.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                        subscription.status === 'approved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {subscription.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {subscription.status === 'approved' && <Check className="w-3 h-3 mr-1" />}
                        {subscription.status === 'rejected' && <X className="w-3 h-3 mr-1" />}
                        {subscription.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedSubscription(subscription)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        {subscription.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(subscription.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleReject(subscription.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {selectedSubscription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedSubscription.sellerName}
                    </h2>
                    <p className="text-gray-600">{selectedSubscription.sellerEmail}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSubscription(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Subscription Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Plan:</span>
                        <span className="font-medium">{selectedSubscription.plan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount:</span>
                        <span className="font-medium">{selectedSubscription.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Date:</span>
                        <span className="font-medium">{selectedSubscription.paymentDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-mono text-sm">{selectedSubscription.paypalTransactionId}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Plan Features</h3>
                    <div className="space-y-2">
                      {selectedSubscription.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {selectedSubscription.status === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        handleApprove(selectedSubscription.id)
                        setSelectedSubscription(null)
                      }}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                      Approve Subscription
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedSubscription.id)
                        setSelectedSubscription(null)
                      }}
                      className="flex-1 bg-red-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                    >
                      Reject Subscription
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSubscriptionManagement
