import { Link } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="text-red-600" size={40} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8 max-w-md">
          You don't have permission to access this page. Please contact your administrator if you believe this is an error.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <Home className="mr-2" size={20} />
            Back to Home
          </Link>
          
          <div className="text-sm text-gray-500">
            If you need to login with a different account,{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700 font-medium">
              click here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
