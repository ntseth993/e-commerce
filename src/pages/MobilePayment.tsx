import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, CreditCard, Shield, CheckCircle, Clock, ArrowLeft, AlertCircle, User, Package } from 'lucide-react'

interface PaymentRequest {
  id: string
  type: 'seller_subscription' | 'customer_order'
  amount: number
  phoneNumber: string
  status: 'pending' | 'confirmed' | 'completed' | 'failed'
  timestamp: string
  description: string
  from?: string
  to?: string
}

const MobilePayment = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentType, setPaymentType] = useState<'seller_subscription' | 'customer_order'>('seller_subscription')
  const [isProcessing, setIsProcessing] = useState(false)
  const [confirmationCode, setConfirmationCode] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentRequest, setCurrentRequest] = useState<PaymentRequest | null>(null)

  // Mock payment requests
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([
    {
      id: 'REQ-001',
      type: 'seller_subscription',
      amount: 29.99,
      phoneNumber: '+237123456789',
      status: 'pending',
      timestamp: '2024-03-13 14:30',
      description: 'Professional Plan - Monthly',
      from: '+237123456789',
      to: 'admin'
    },
    {
      id: 'REQ-002', 
      type: 'customer_order',
      amount: 299.99,
      phoneNumber: '+237987654321',
      status: 'confirmed',
      timestamp: '2024-03-13 15:15',
      description: 'Order #ORD-2024-1234 - Premium Headphones',
      from: '+237987654321',
      to: 'seller'
    }
  ])

  const handlePaymentRequest = () => {
    if (!phoneNumber || !amount) {
      alert('Please enter phone number and amount')
      return
    }

    setIsProcessing(true)
    
    // Simulate payment request
    setTimeout(() => {
      const newRequest: PaymentRequest = {
        id: `REQ-${Date.now()}`,
        type: paymentType,
        amount: parseFloat(amount),
        phoneNumber,
        status: 'pending',
        timestamp: new Date().toLocaleString(),
        description: paymentType === 'seller_subscription' 
          ? `${paymentType === 'seller_subscription' ? 'Professional Plan' : 'Enterprise Plan'} - ${paymentType === 'seller_subscription' ? 'Monthly' : 'Yearly'}`
          : `Order Payment - Product Purchase`,
        from: phoneNumber,
        to: paymentType === 'seller_subscription' ? 'admin' : 'seller'
      }

      setPaymentRequests([newRequest, ...paymentRequests])
      setCurrentRequest(newRequest)
      setShowConfirmation(true)
      setIsProcessing(false)
      
      // Send confirmation SMS (simulated)
      alert(`Confirmation code sent to ${phoneNumber}. Please enter the code to confirm payment.`)
    }, 2000)
  }

  const handleConfirmation = () => {
    if (!confirmationCode) {
      alert('Please enter confirmation code')
      return
    }

    setIsProcessing(true)
    
    // Simulate confirmation
    setTimeout(() => {
      if (confirmationCode === '123456') { // Mock confirmation code
        // Update payment request status
        setPaymentRequests(requests => 
          requests.map(req => 
            req.id === currentRequest?.id 
              ? { ...req, status: 'confirmed' }
              : req
          )
        )
        
        // Process payment after confirmation
        setTimeout(() => {
          setPaymentRequests(requests => 
            requests.map(req => 
              req.id === currentRequest?.id 
                ? { ...req, status: 'completed' }
                : req
            )
          )
          
          alert(`Payment of $${currentRequest?.amount} completed successfully!`)
          setShowConfirmation(false)
          setConfirmationCode('')
          setCurrentRequest(null)
          setPhoneNumber('')
          setAmount('')
        }, 2000)
      } else {
        alert('Invalid confirmation code. Please try again.')
      }
      setIsProcessing(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'confirmed': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'failed': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'confirmed': return <Shield className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      case 'failed': return <AlertCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mobile Payment Center
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make secure payments using your mobile number. Get instant confirmation codes for all transactions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Smartphone className="mr-3 text-purple-600" size={28} />
              Make Payment
            </h2>

            {/* Payment Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentType('seller_subscription')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentType === 'seller_subscription' 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Package className="mx-auto mb-2" size={24} />
                  <div className="font-semibold">Seller Subscription</div>
                  <div className="text-sm opacity-75">Pay for seller plan</div>
                </button>
                <button
                  onClick={() => setPaymentType('customer_order')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentType === 'customer_order' 
                      ? 'border-purple-500 bg-purple-50 text-purple-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <User className="mx-auto mb-2" size={24} />
                  <div className="font-semibold">Customer Order</div>
                  <div className="text-sm opacity-75">Pay for products</div>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+237 XXX XXX XXX"
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handlePaymentRequest}
                disabled={isProcessing}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    Send Payment Request
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Payment Requests */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Payment Requests
            </h2>
            
            <div className="space-y-4">
              {paymentRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="font-semibold text-gray-900 mr-2">{request.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          {request.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">{request.timestamp}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">${request.amount}</div>
                      <div className="text-xs text-gray-500">
                        {request.type === 'seller_subscription' ? 'To Admin' : 'To Seller'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div className="mb-1">
                      <strong>Type:</strong> {request.type === 'seller_subscription' ? 'Seller Subscription' : 'Customer Order'}
                    </div>
                    <div className="mb-1">
                      <strong>Phone:</strong> {request.phoneNumber}
                    </div>
                    <div>
                      <strong>Description:</strong> {request.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && currentRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Confirm Payment
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold">${currentRequest.amount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">To:</span>
                  <span className="font-bold">{currentRequest.to === 'admin' ? 'Admin' : 'Seller'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Request ID:</span>
                  <span className="font-bold">{currentRequest.id}</span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Confirmation Code
                </label>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-mono"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter the confirmation code sent to {currentRequest.phoneNumber}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowConfirmation(false)
                    setConfirmationCode('')
                    setCurrentRequest(null)
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmation}
                  disabled={isProcessing}
                  className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Confirming...
                    </>
                  ) : (
                    <>
                      Confirm Payment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How Mobile Payment Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Enter Details</h4>
              <p className="text-sm text-gray-600">
                Enter your mobile number and payment amount. Choose payment type (seller subscription or customer order).
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Get Code</h4>
              <p className="text-sm text-gray-600">
                Receive a 6-digit confirmation code via SMS to verify your identity and authorize the payment.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Confirm & Pay</h4>
              <p className="text-sm text-gray-600">
                Enter the confirmation code to complete the payment. Money is transferred instantly to the recipient.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="mt-8 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-yellow-800">
              <strong>Admin Merchant Wallet:</strong> All payments are processed through the admin merchant wallet. 
              Seller payments go to admin, customer payments go to sellers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobilePayment
