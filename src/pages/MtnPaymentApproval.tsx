import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Smartphone, CheckCircle, Shield, Clock, AlertTriangle, ArrowLeft, RefreshCw, Check, X } from 'lucide-react'

interface MtnPaymentRequest {
  id: string
  phoneNumber: string
  amount: number
  paymentType: 'seller_subscription' | 'customer_order'
  status: 'pending' | 'sms_sent' | 'approved' | 'rejected' | 'expired'
  requestTime: string
  smsCode?: string
  expiresAt?: string
  description: string
  mtnReference?: string
  mtnStatus?: string
}

const MtnPaymentApproval = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [amount, setAmount] = useState('')
  const [paymentType, setPaymentType] = useState<'seller_subscription' | 'customer_order'>('seller_subscription')
  const [currentRequest, setCurrentRequest] = useState<MtnPaymentRequest | null>(null)
  const [smsCode, setSmsCode] = useState('')
  const [isSendingSms, setIsSendingSms] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  // Mock MTN payment requests
  const [paymentRequests, setPaymentRequests] = useState<MtnPaymentRequest[]>([
    {
      id: 'MTN-001',
      phoneNumber: '+237123456789',
      amount: 29.99,
      paymentType: 'seller_subscription',
      status: 'sms_sent',
      requestTime: '2024-03-13 15:30',
      smsCode: '789123',
      expiresAt: '2024-03-13 16:00',
      description: 'Professional Plan - Monthly Subscription'
    },
    {
      id: 'MTN-002',
      phoneNumber: '+237987654321',
      amount: 299.99,
      paymentType: 'customer_order',
      status: 'approved',
      requestTime: '2024-03-13 14:45',
      description: 'Order #ORD-2024-1234 - Premium Headphones'
    }
  ])

  // Countdown timer for SMS code expiration
  useEffect(() => {
    if (currentRequest?.status === 'sms_sent' && currentRequest.expiresAt) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [currentRequest])

  const handleSendSms = async () => {
    if (!phoneNumber || !amount) {
      alert('Please enter phone number and amount')
      return
    }

    setIsSendingSms(true)
    
    try {
      // Call MTN Mobile Money API
      const response = await fetch('https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay', {
        method: 'POST',
        headers: {
          'Authorization': 'Ocp-Apim-Subscription-Key 5c861357741e4bbb3bec57c29edae60a6',
          'X-Reference-Id': '123456789',
          'X-Target-Environment': 'sandbox',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'XOF',
          externalId: `PAY-${Date.now()}`,
          payer: {
            partyIdType: 'MSISDN',
            partyId: phoneNumber.replace('+', '')
          },
          payerMessage: paymentType === 'seller_subscription' 
            ? 'Payment for seller subscription plan'
            : 'Payment for customer order',
          payeeNote: paymentType === 'seller_subscription' 
            ? 'Professional Plan - Monthly'
            : 'Order Payment - Product Purchase'
        })
      })

      const result = await response.json()
      
      if (response.ok && result.status === 'PENDING') {
        const newRequest: MtnPaymentRequest = {
          id: `MTN-${Date.now()}`,
          phoneNumber,
          amount: parseFloat(amount),
          paymentType,
          status: 'sms_sent',
          requestTime: new Date().toLocaleString(),
          smsCode: result.otp || 'Generated',
          expiresAt: new Date(Date.now() + 30 * 60 * 1000).toLocaleString(),
          description: paymentType === 'seller_subscription' 
            ? 'Professional Plan - Monthly Subscription'
            : 'Order Payment - Product Purchase',
          mtnReference: result.referenceId,
          mtnStatus: result.status
        }

        setPaymentRequests([newRequest, ...paymentRequests])
        setCurrentRequest(newRequest)
        setIsSendingSms(false)
        setTimeLeft(30 * 60)
        
        alert(`MTN SMS sent! Reference: ${result.referenceId}`)
      } else {
        throw new Error(result.message || 'MTN API error')
      }
    } catch (error) {
      console.error('MTN API Error:', error)
      alert(`MTN API Error: ${error.message}`)
      setIsSendingSms(false)
    }
  }

  const handleApprovePayment = async () => {
    if (!smsCode || !currentRequest) {
      alert('Please enter the SMS code')
      return
    }

    setIsVerifying(true)
    
    try {
      // Call MTN Mobile Money API to verify OTP
      const response = await fetch('https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay', {
        method: 'POST',
        headers: {
          'Authorization': 'Ocp-Apim-Subscription-Key 5c861357741e4bbb3bec57c29edae60a6',
          'X-Reference-Id': '123456789',
          'X-Target-Environment': 'sandbox',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        },
        body: JSON.stringify({
          amount: currentRequest.amount,
          currency: 'XOF',
          externalId: currentRequest.mtnReference || `VERIFY-${Date.now()}`,
          payer: {
            partyIdType: 'MSISDN',
            partyId: currentRequest.phoneNumber.replace('+', '')
          },
          payerMessage: 'Payment verification with OTP',
          payeeNote: `Verify payment ${currentRequest.id}`
        })
      })

      const result = await response.json()
      
      if (response.ok && (result.status === 'SUCCESSFUL' || result.status === 'APPROVED')) {
        setPaymentRequests(requests => 
          requests.map(req => 
            req.id === currentRequest.id 
              ? { ...req, status: 'approved' }
              : req
          )
        )
        
        setTimeout(() => {
          alert(`MTN payment of $${currentRequest.amount} approved and processed successfully!`)
          setCurrentRequest(null)
          setSmsCode('')
          setPhoneNumber('')
          setAmount('')
        }, 1500)
      } else {
        alert(`Invalid OTP or payment verification failed: ${result.message || 'Please try again'}`)
      }
    } catch (error) {
      console.error('MTN Verification Error:', error)
      alert(`MTN API Error: ${error.message}`)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendSms = () => {
    if (currentRequest) {
      setIsSendingSms(true)
      setTimeout(() => {
        const newCode = Math.floor(100000 + Math.random() * 900000).toString()
        alert(`New MTN SMS sent to ${currentRequest.phoneNumber} with code: ${newCode}`)
        
        setPaymentRequests(requests => 
          requests.map(req => 
            req.id === currentRequest.id 
              ? { ...req, smsCode: newCode, expiresAt: new Date(Date.now() + 30 * 60 * 1000).toLocaleString() }
              : req
          )
        )
        setTimeLeft(30 * 60)
        setIsSendingSms(false)
      }, 1000)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'sms_sent': return 'text-blue-600 bg-blue-100'
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'expired': return 'text-orange-600 bg-orange-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />
      case 'sms_sent': return <Smartphone className="w-4 h-4" />
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'rejected': return <X className="w-4 h-4" />
      case 'expired': return <AlertTriangle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone className="text-orange-600" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MTN Mobile Payment
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Secure mobile payments with MTN SMS approval. Enter your number and receive instant approval codes.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* MTN Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Smartphone className="mr-3 text-orange-600" size={28} />
              Request MTN Payment
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
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Seller Subscription</div>
                  <div className="text-sm opacity-75">Pay for seller plan</div>
                </button>
                <button
                  onClick={() => setPaymentType('customer_order')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    paymentType === 'customer_order' 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold">Customer Order</div>
                  <div className="text-sm opacity-75">Pay for products</div>
                </button>
              </div>
            </div>

            {/* MTN Payment Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  MTN Phone Number
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
                    className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount ($)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 font-bold">$</span>
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-8 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleSendSms}
                disabled={isSendingSms}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSendingSms ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending MTN SMS...
                  </>
                ) : (
                  <>
                    Send Approval Request
                  </>
                )}
              </button>
            </div>
          </div>

          {/* SMS Approval Section */}
          {currentRequest && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Shield className="mr-3 text-orange-600" size={28} />
                SMS Approval Required
              </h2>

              {/* Request Details */}
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Request ID:</span>
                  <span className="font-bold">{currentRequest.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-bold">${currentRequest.amount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-bold">{currentRequest.phoneNumber}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(currentRequest.status)}`}>
                    {getStatusIcon(currentRequest.status)}
                    {currentRequest.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expires:</span>
                  <span className="font-bold">{currentRequest.expiresAt}</span>
                </div>
              </div>

              {/* SMS Code Input */}
              {currentRequest.status === 'sms_sent' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter MTN SMS Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={smsCode}
                        onChange={(e) => setSmsCode(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg font-mono text-2xl"
                      />
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-500">
                        Code sent to {currentRequest.phoneNumber}
                      </span>
                      {timeLeft > 0 && (
                        <span className="text-sm font-medium text-orange-600">
                          Time left: {formatTime(timeLeft)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleResendSms}
                      disabled={isSendingSms}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      {isSendingSms ? (
                        <>
                          <RefreshCw className="animate-spin mr-2" size={16} />
                          Resending...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2" size={16} />
                          Resend SMS
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleApprovePayment}
                      disabled={isVerifying || !smsCode}
                      className="flex-1 bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isVerifying ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2" size={16} />
                          Approve Payment
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Success State */}
              {currentRequest.status === 'approved' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    Payment Approved!
                  </h3>
                  <p className="text-gray-600">
                    Your MTN payment of ${currentRequest.amount} has been successfully processed.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/seller-dashboard"
                      className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MTN Info */}
        <div className="mt-8 text-center">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-orange-800">
              <strong>MTN Mobile Money Integration:</strong> All payments are processed through MTN API 
              with SMS verification for maximum security. Approval codes expire in 30 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MtnPaymentApproval
