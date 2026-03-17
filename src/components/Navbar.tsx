import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Heart, User, Store, Shield } from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user } = useAuth()

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/Market Logo.jpg" 
                alt="Market Logo" 
                className="h-10 w-10 rounded-full mr-2 object-cover"
              />
              <span className="text-2xl font-bold text-purple-600">
                Market
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors ${location.pathname === '/' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`transition-colors ${location.pathname === '/products' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Products
            </Link>
            <Link 
              to="/deals" 
              className={`transition-colors ${location.pathname === '/deals' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Deals
            </Link>
            <Link 
              to="/about" 
              className={`transition-colors ${location.pathname === '/about' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors ${location.pathname === '/contact' ? 'text-purple-600' : 'text-gray-700 hover:text-purple-600'}`}
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
              <Heart size={20} />
            </button>
            <Link to="/cart" className="p-2 text-gray-700 hover:text-purple-600 transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            
            {/* Notifications */}
            {user && (
              <NotificationDropdown userId={user.id} />
            )}
            
            {/* User Dropdown */}
            <div className="relative group">
              <button className="p-2 text-gray-700 hover:text-purple-600 transition-colors">
                <User size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/customer-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                  <User size={16} className="inline mr-2" />
                  Customer Dashboard
                </Link>
                <Link to="/seller-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                  <Store size={16} className="inline mr-2" />
                  Seller Dashboard
                </Link>
                <Link to="/admin-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors">
                  <Shield size={16} className="inline mr-2" />
                  Admin Panel
                </Link>
                <hr className="my-2" />
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Home
              </Link>
              <Link to="/products" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Products
              </Link>
              <Link to="/deals" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Deals
              </Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                About
              </Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Contact
              </Link>
              <div className="flex items-center space-x-4 px-3 py-2 border-t mt-4 pt-4">
                <button className="p-2 text-gray-700 hover:text-purple-600">
                  <Heart size={20} />
                </button>
                <Link to="/cart" className="p-2 text-gray-700 hover:text-purple-600 relative">
                  <ShoppingBag size={20} />
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    3
                  </span>
                </Link>
                <button className="p-2 text-gray-700 hover:text-purple-600">
                  <User size={20} />
                </button>
              </div>
              <div className="border-t mt-4 pt-4">
                <Link to="/customer-dashboard" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                  Customer Dashboard
                </Link>
                <Link to="/seller-dashboard" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                  Seller Dashboard
                </Link>
                <Link to="/seller-subscription" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                  Upgrade Plan
                </Link>
                <Link to="/mobile-payment" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                  Mobile Payment
                </Link>
                <Link to="/admin-dashboard" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                  Admin Panel
                </Link>
                <Link to="/admin-subscriptions" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                  Manage Subscriptions
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
