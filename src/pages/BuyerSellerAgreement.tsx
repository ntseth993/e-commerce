import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft, Users, DollarSign, Package, Calendar } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const BuyerSellerAgreement = () => {
  const { user } = useAuth()
  const [showForm, setShowForm] = useState(false)
  const [agreements, setAgreements] = useState([
    // Sample agreements
    {
      id: 'BSA-001',
      buyerId: 'buyer-001',
      buyerName: 'John Buyer',
      sellerId: 'seller-001',
      sellerName: 'Jane Seller',
      productId: 'prod-001',
      productName: 'Premium Widget',
      status: 'pending' as const,
      terms: {
        price: 299.99,
        quantity: 10,
        deliveryDate: '2024-02-15',
        paymentTerms: '50% upfront, 50% on delivery',
        warrantyPeriod: '12 months',
        returnPolicy: '30 days return policy'
      },
      createdAt: '2024-01-20',
      expiresAt: '2024-02-20'
    }
  ])
  const [newAgreement, setNewAgreement] = useState({
    sellerName: '',
    sellerEmail: '',
    productName: '',
    terms: {
      price: 0,
      quantity: 1,
      deliveryDate: '',
      paymentTerms: 'Full payment upfront',
      warrantyPeriod: '6 months',
      returnPolicy: '7 days return policy'
    }
  })

  const handleSubmitAgreement = () => {
    if (!user) return

    const agreement = {
      id: `BSA-${Date.now()}`,
      buyerId: user.id,
      buyerName: user.name || 'Buyer Name',
      buyerEmail: user.email || 'buyer@example.com',
      sellerId: 'seller-temp',
      sellerName: newAgreement.sellerName,
      sellerEmail: newAgreement.sellerEmail,
      productId: 'prod-temp',
      productName: newAgreement.productName,
      status: 'pending' as const,
      terms: newAgreement.terms,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
    }

    setAgreements(prev => [agreement, ...prev])
    setShowForm(false)
    setNewAgreement({
      sellerName: '',
      sellerEmail: '',
      productName: '',
      terms: {
        price: 0,
        quantity: 1,
        deliveryDate: '',
        paymentTerms: 'Full payment upfront',
        warrantyPeriod: '6 months',
        returnPolicy: '7 days return policy'
      }
    })
    alert('Buyer-Seller agreement request sent! Waiting for seller confirmation.')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-600" size={20} />
      case 'confirmed':
        return <CheckCircle className="text-green-600" size={20} />
      case 'rejected':
        return <XCircle className="text-red-600" size={20} />
      default:
        return <AlertCircle className="text-gray-600" size={20} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/customer-dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Users className="text-purple-600 mr-3" size={32} />
              <h1 className="text-3xl font-bold text-gray-900">Buyer-Seller Agreements</h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
            >
              {showForm ? 'Cancel' : 'New Agreement'}
            </button>
          </div>

          {!showForm ? (
            <div>
              <p className="text-gray-600 mb-6">
                Manage your purchase agreements with sellers. Create, track, and confirm terms for your transactions.
              </p>

              {agreements.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="text-gray-400 mx-auto mb-4" size={48} />
                  <p className="text-gray-600 mb-4">No agreements yet.</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Create Your First Agreement
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {agreements.map((agreement) => (
                    <div key={agreement.id} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            {getStatusIcon(agreement.status)}
                            <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agreement.status)}`}>
                              {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900">{agreement.productName}</h3>
                          <p className="text-sm text-gray-600">Agreement ID: {agreement.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">${agreement.terms.price}</p>
                          <p className="text-sm text-gray-600">Quantity: {agreement.terms.quantity}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Parties</h4>
                          <div className="space-y-1 text-sm">
                            <div>
                              <span className="text-gray-600">Buyer: </span>
                              <span className="font-medium">{agreement.buyerName}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Seller: </span>
                              <span className="font-medium">{agreement.sellerName}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Key Terms</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                              <Calendar className="text-gray-400 mr-2" size={14} />
                              <span className="text-gray-600">Delivery: </span>
                              <span className="font-medium">{agreement.terms.deliveryDate}</span>
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="text-gray-400 mr-2" size={14} />
                              <span className="text-gray-600">Payment: </span>
                              <span className="font-medium">{agreement.terms.paymentTerms}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                          Created on {new Date(agreement.createdAt).toLocaleDateString()}
                        </p>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-purple-600 hover:text-purple-700 font-medium text-sm">
                            View Details
                          </button>
                          {agreement.status === 'pending' && (
                            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm">
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6">Create New Agreement</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Seller Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Seller Name</label>
                        <input
                          type="text"
                          value={newAgreement.sellerName}
                          onChange={(e) => setNewAgreement({...newAgreement, sellerName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter seller name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Seller Email</label>
                        <input
                          type="email"
                          value={newAgreement.sellerEmail}
                          onChange={(e) => setNewAgreement({...newAgreement, sellerEmail: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="seller@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">Product Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input
                          type="text"
                          value={newAgreement.productName}
                          onChange={(e) => setNewAgreement({...newAgreement, productName: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Agreement Terms</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                        <input
                          type="number"
                          value={newAgreement.terms.price}
                          onChange={(e) => setNewAgreement({
                            ...newAgreement,
                            terms: {...newAgreement.terms, price: parseFloat(e.target.value)}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                        <input
                          type="number"
                          value={newAgreement.terms.quantity}
                          onChange={(e) => setNewAgreement({
                            ...newAgreement,
                            terms: {...newAgreement.terms, quantity: parseInt(e.target.value)}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          min="1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
                        <input
                          type="date"
                          value={newAgreement.terms.deliveryDate}
                          onChange={(e) => setNewAgreement({
                            ...newAgreement,
                            terms: {...newAgreement.terms, deliveryDate: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                        <select
                          value={newAgreement.terms.paymentTerms}
                          onChange={(e) => setNewAgreement({
                            ...newAgreement,
                            terms: {...newAgreement.terms, paymentTerms: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="Full payment upfront">Full payment upfront</option>
                          <option value="50% upfront, 50% on delivery">50% upfront, 50% on delivery</option>
                          <option value="30% upfront, 70% on delivery">30% upfront, 70% on delivery</option>
                          <option value="Payment on delivery">Payment on delivery</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Warranty Period</label>
                        <select
                          value={newAgreement.terms.warrantyPeriod}
                          onChange={(e) => setNewAgreement({
                            ...newAgreement,
                            terms: {...newAgreement.terms, warrantyPeriod: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="No warranty">No warranty</option>
                          <option value="3 months">3 months</option>
                          <option value="6 months">6 months</option>
                          <option value="12 months">12 months</option>
                          <option value="24 months">24 months</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Return Policy</label>
                        <select
                          value={newAgreement.terms.returnPolicy}
                          onChange={(e) => setNewAgreement({
                            ...newAgreement,
                            terms: {...newAgreement.terms, returnPolicy: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="No returns">No returns</option>
                          <option value="7 days return policy">7 days return policy</option>
                          <option value="14 days return policy">14 days return policy</option>
                          <option value="30 days return policy">30 days return policy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    By submitting this agreement, you propose these terms to the seller. 
                    The seller will need to review and accept these terms before the agreement becomes active.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowForm(false)}
                    className="flex-1 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmitAgreement}
                    className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Send Agreement to Seller
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BuyerSellerAgreement
