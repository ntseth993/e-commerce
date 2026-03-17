import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ShoppingBag, Shield, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'customer'
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const success = await login(formData.email, formData.password, formData.role)
      
      if (success) {
        // Redirect based on role after successful login
        if (formData.role === 'customer') {
          navigate('/customer-dashboard')
        } else if (formData.role === 'seller') {
          navigate('/seller-dashboard')
        } else if (formData.role === 'admin') {
          navigate('/admin-dashboard')
        }
      } else {
        setError('Invalid email or password')
      }
    } catch (error) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error when user types
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center px-4">
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
            <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-12 flex flex-col justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <ShoppingBag className="text-purple-600" size={40} />
                </div>
                <h1 className="text-4xl font-bold text-white mb-4">ShopHub</h1>
                <p className="text-purple-200 mb-8">
                  Your trusted multi-vendor marketplace for quality products and exceptional service.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-purple-200">
                    <Shield className="mr-3" size={20} />
                    <span>Secure Authentication</span>
                  </div>
                  <div className="flex items-center text-purple-200">
                    <User className="mr-3" size={20} />
                    <span>Role-Based Access</span>
                  </div>
                  <div className="flex items-center text-purple-200">
                    <ShoppingBag className="mr-3" size={20} />
                    <span>Multi-Vendor Platform</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-12">
              <div className="max-w-md mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600 mb-8">Sign in to access your account</p>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <AlertCircle className="text-red-500 mr-2" size={20} />
                      <span className="text-red-700 text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* Real Account Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-2">System Accounts:</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Admin:</strong> ntseth993@gmail.com / admin123</div>
                    <div><strong>Seller:</strong> tuyishimegloire08@gmail.com / seller123</div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I am a:
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="customer">Customer</option>
                      <option value="seller">Seller</option>
                      <option value="admin">Administrator</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="text-gray-400" size={20} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="text-gray-400" size={20} />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-400"
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
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-700">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                </form>

                {/* Register Link */}
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-purple-600 hover:text-purple-700">
                      Sign up for free
                    </Link>
                  </p>
                </div>

                {/* Real Accounts */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Quick Login:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Admin:</span>
                      <button 
                        onClick={() => {
                          setFormData({ email: 'ntseth993@gmail.com', password: 'admin123', role: 'admin' })
                        }}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        ntseth993@gmail.com / admin123
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <span>Seller:</span>
                      <button 
                        onClick={() => {
                          setFormData({ email: 'tuyishimegloire08@gmail.com', password: 'seller123', role: 'seller' })
                        }}
                        className="text-purple-600 hover:text-purple-700 font-medium"
                      >
                        tuyishimegloire08@gmail.com / seller123
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
