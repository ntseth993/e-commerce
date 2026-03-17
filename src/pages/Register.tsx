import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Check, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    businessName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState<{[key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { login, register } = useAuth()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (formData.role === 'seller' && !formData.businessName.trim()) newErrors.businessName = 'Business name is required'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setSuccess('')
    setIsLoading(true)
    
    if (validateForm()) {
      try {
        // Create user object
        const fullName = `${formData.firstName} ${formData.lastName}`
        const businessName = formData.businessName || undefined
        
        // Register the user first
        const registerSuccess = await register({
          name: fullName,
          email: formData.email,
          role: formData.role as 'customer' | 'seller' | 'admin',
          businessName: businessName
        })
        
        if (registerSuccess) {
          // Auto-login after successful registration
          const loginSuccess = await login(formData.email, formData.password, formData.role)
          
          if (loginSuccess) {
            setSuccess('Account created successfully! You are now logged in.')
            // Redirect based on role after successful registration
            setTimeout(() => {
              if (formData.role === 'customer') {
                navigate('/customer-dashboard')
              } else if (formData.role === 'seller') {
                navigate('/seller-dashboard')
              } else if (formData.role === 'admin') {
                navigate('/admin-dashboard')
              }
            }, 1500)
          } else {
            setErrors({ general: 'Account created but login failed. Please try logging in manually.' })
          }
        } else {
          setErrors({ general: 'Registration failed. Email may already be registered.' })
        }
      } catch (error) {
        setErrors({ general: 'Registration failed. Please try again.' })
      }
    } else {
      setIsLoading(false)
    }
    
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black bg-opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-2v-4h-2v4h-2v4h2v-4h2v-4h2v4h2v-4h2v4h2v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Side - Branding */}
            <div className="bg-gradient-to-br from-blue-700 to-purple-900 p-12 flex flex-col justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <User className="text-blue-600" size={40} />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">Join ShopHub</h1>
                <p className="text-blue-200 mb-8">
                  Create your account and start selling or shopping on our trusted marketplace platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-blue-200">
                    <Check className="mr-3" size={20} />
                    <span>Free Account Setup</span>
                  </div>
                  <div className="flex items-center text-blue-200">
                    <Check className="mr-3" size={20} />
                    <span>Instant Verification</span>
                  </div>
                  <div className="flex items-center text-blue-200">
                    <Check className="mr-3" size={20} />
                    <span>Secure Platform</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="p-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600 mb-8">Join our marketplace today</p>

                {/* Success Message */}
                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <Check className="text-green-500 mr-2" size={20} />
                      <span className="text-green-700 text-sm">{success}</span>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <X className="text-red-500 mr-2" size={20} />
                      <span className="text-red-700 text-sm">{errors.general}</span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Type
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="customer">Customer Account</option>
                      <option value="seller">Seller Account</option>
                    </select>
                  </div>

                  {/* Business Name (for sellers) */}
                  {formData.role === 'seller' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Enter your business name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.businessName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-sm text-red-600">{errors.businessName}</p>
                      )}
                    </div>
                  )}

                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.firstName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.lastName ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="text-gray-400" size={20} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="text-gray-400" size={20} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="text-gray-400" size={20} />
                        </div>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Create password"
                          className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showPassword ? (
                            <EyeOff className="text-gray-400 hover:text-gray-600" size={20} />
                          ) : (
                            <Eye className="text-gray-400 hover:text-gray-600" size={20} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="text-gray-400" size={20} />
                        </div>
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm password"
                          className={`w-full pl-11 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="text-gray-400 hover:text-gray-600" size={20} />
                          ) : (
                            <Eye className="text-gray-400 hover:text-gray-600" size={20} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  {/* Address (for sellers) */}
                  {formData.role === 'seller' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Business Address
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="text-gray-400" size={20} />
                          </div>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Street address"
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                        />
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="State"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                        />
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          placeholder="ZIP Code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                        />
                      </div>
                    </div>
                  )}

                  {/* Terms and Conditions */}
                  <div>
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I agree to the{' '}
                        <Link to="/terms" className="text-purple-600 hover:text-purple-700">
                          Terms and Conditions
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-purple-600 hover:text-purple-700">
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    Create Account
                  </button>
                </form>

                {/* Login Link */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-purple-600 hover:text-purple-700">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
