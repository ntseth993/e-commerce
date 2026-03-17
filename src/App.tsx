import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProductsProvider } from './context/ProductsContext'
import { AnalyticsProvider } from './context/AnalyticsContext'
import { AgreementProvider } from './context/AgreementContext'
import { NotificationProvider } from './context/NotificationContext'
import { EmailVerificationProvider } from './context/EmailVerificationContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Deals from './pages/Deals'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import SellerSubscription from './pages/SellerSubscription'
import SellerAgreement from './pages/SellerAgreement'
import BuyerSellerAgreement from './pages/BuyerSellerAgreement'
import EmailVerification from './pages/EmailVerification'
import MobilePayment from './pages/MobilePayment'
import MtnPaymentApproval from './pages/MtnPaymentApproval'
import CustomerDashboard from './pages/CustomerDashboard'
import SellerDashboard from './pages/SellerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import AdminSubscriptionManagement from './pages/AdminSubscriptionManagement'
import AdminAgreementManagement from './pages/AdminAgreementManagement'
import Unauthorized from './pages/Unauthorized'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <EmailVerificationProvider>
        <NotificationProvider>
          <AgreementProvider>
            <AnalyticsProvider>
              <ProductsProvider>
                <Router>
                  <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/seller-subscription" element={<SellerSubscription />} />
          <Route path="/seller-agreement" element={<SellerAgreement />} />
          <Route path="/buyer-seller-agreement" element={<BuyerSellerAgreement />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/mobile-payment" element={<MobilePayment />} />
          <Route path="/mtn-payment-approval" element={<MtnPaymentApproval />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route 
            path="/customer-dashboard" 
            element={
              <ProtectedRoute requiredRole="customer">
                <CustomerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/seller-dashboard" 
            element={
              <ProtectedRoute requiredRole="seller">
                <SellerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-subscription-management" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminSubscriptionManagement />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-agreement-management" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminAgreementManagement />
              </ProtectedRoute>
            } 
          />
        </Routes>
          </div>
        </Router>
      </ProductsProvider>
    </AnalyticsProvider>
  </AgreementProvider>
</NotificationProvider>
</EmailVerificationProvider>
</AuthProvider>
  )
}

export default App
