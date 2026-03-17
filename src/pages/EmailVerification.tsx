import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle, AlertCircle, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useEmailVerification } from '../context/EmailVerificationContext'
import { useAuth } from '../context/AuthContext'
import { emailService } from '../services/emailService'

const EmailVerification = () => {
  const [code, setCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showOTP, setShowOTP] = useState(false)
  const { generateVerificationCode, verifyEmail, isEmailVerified } = useEmailVerification()
  const { user } = useAuth()

  const handleSendCode = () => {
    if (!user?.email) return
    
    generateVerificationCode(user.email)
    setVerificationStatus('idle')
  }

  const handleVerify = () => {
    if (!user?.email || !code.trim()) return
    
    setIsVerifying(true)
    
    setTimeout(() => {
      const isValid = verifyEmail(user.email, code.toUpperCase())
      
      if (isValid) {
        setVerificationStatus('success')
      } else {
        setVerificationStatus('error')
      }
      
      setIsVerifying(false)
    }, 1000)
  }

  const handleResend = () => {
    setCode('')
    setVerificationStatus('idle')
    handleSendCode()
  }

  const getTestOTP = () => {
    if (!user?.email) return null
    return emailService.getTestOTP(user.email)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Required</h1>
              <p className="text-gray-600">Please log in to verify your email.</p>
              <Link 
                to="/login" 
                className="mt-6 inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isEmailVerified(user.email)) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center">
              <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Already Verified</h1>
              <p className="text-gray-600 mb-6">Your email has been verified. You can now proceed with your subscription.</p>
              <Link 
                to="/seller-subscription" 
                className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Proceed to Subscription
                <CheckCircle size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/seller-dashboard" className="inline-flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <Mail className="text-purple-600 mx-auto mb-4" size={48} />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
            <p className="text-gray-600 mb-6">
              We've sent a verification code to <strong>{user.email}</strong>. 
              Please enter the code below to complete your email verification.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter 8-character code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-center text-lg font-mono"
                maxLength={8}
              />
            </div>

            {verificationStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="text-red-600 mr-2" size={20} />
                  <p className="text-red-800 text-sm">
                    Invalid verification code. Please check your email and try again.
                  </p>
                </div>
              </div>
            )}

            {verificationStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={20} />
                  <p className="text-green-800 text-sm">
                    Email verified successfully! You can now proceed with subscription.
                  </p>
                </div>
              </div>
            )}

            {/* Test OTP Display - Only for development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-yellow-800">Test Mode - OTP Code</h4>
                  <button
                    onClick={() => setShowOTP(!showOTP)}
                    className="text-yellow-600 hover:text-yellow-700"
                  >
                    {showOTP ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {showOTP && (() => {
                  const testOTP = getTestOTP()
                  return testOTP ? (
                    <div className="text-sm">
                      <p className="text-yellow-700 mb-1">
                        Your OTP code is: <strong className="text-lg font-mono bg-yellow-100 px-2 py-1 rounded">{testOTP.code}</strong>
                      </p>
                      <p className="text-yellow-600 text-xs">
                        Expires: {new Date(testOTP.expiresAt).toLocaleTimeString()}
                      </p>
                    </div>
                  ) : (
                    <p className="text-yellow-600 text-sm">No OTP generated yet. Click "Send Code" first.</p>
                  )
                })()}
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleVerify}
                disabled={isVerifying || !code.trim()}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify Email'
                )}
              </button>

              <button
                onClick={handleResend}
                className="w-full border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Resend Code
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code? Check your spam folder or 
              <button 
                onClick={handleResend}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                resend the code
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
