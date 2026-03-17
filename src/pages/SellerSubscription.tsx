import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Crown, Shield, CreditCard, AlertCircle, Star, Smartphone, ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useAgreement } from '../context/AgreementContext'

const SellerSubscription = () => {
  const { user } = useAuth()
  const { isAgreementActive } = useAgreement()
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'professional' | 'enterprise'>('free')
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'mtn'>('paypal')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPaymentForm, setShowPaymentForm] = useState(false)

  // Check if seller has active agreement
  const hasActiveAgreement = user ? isAgreementActive(user.id) : false

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        'List up to 5 products',
        'Basic analytics',
        'Standard support',
        'Market presence',
        'Basic seller profile'
      ],
      excluded: [
        'No priority support',
        'Limited visibility',
        'No advanced analytics'
      ],
      color: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      id: 'monthly',
      name: 'Professional',
      price: '$29',
      period: 'month',
      description: 'Most popular for growing businesses',
      features: [
        'List up to 100 products',
        'Advanced analytics dashboard',
        'Priority customer support',
        'Featured product placement',
        'Marketing tools',
        'Inventory management',
        'Sales reports',
        'Custom seller page'
      ],
      excluded: [],
      color: 'from-purple-500 to-purple-600',
      popular: true
    },
    {
      id: 'annual',
      name: 'Enterprise',
      price: '$249',
      period: 'year',
      description: 'Best value for established businesses',
      features: [
        'Unlimited products',
        'Premium analytics suite',
        '24/7 dedicated support',
        'Premium placement on homepage',
        'Advanced marketing suite',
        'API access',
        'Bulk listing tools',
        'Custom branding',
        'Priority processing',
        'Advanced inventory management',
        'Multi-channel integration'
      ],
      excluded: [],
      color: 'from-orange-500 to-orange-600',
      popular: false,
      savings: 'Save $99/year'
    }
  ]

  const handleSubscribe = (planId: 'free' | 'professional' | 'enterprise') => {
    if (planId === 'free') {
      alert('Free plan activated! You can now list up to 5 products.')
      return
    }

    // Check if seller has active agreement
    if (!hasActiveAgreement) {
      alert('You need to have an active agreement with the admin before subscribing to a paid plan.')
      // Redirect to agreement page
      window.location.href = '/seller-agreement'
      return
    }

    setSelectedPlan(planId)
    setShowPaymentForm(true)
  }

  const handlePayment = () => {
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      if (paymentMethod === 'paypal') {
        alert(`Redirecting to PayPal for ${selectedPlan} plan...`)
        window.location.href = 'https://www.paypal.com'
      } else if (paymentMethod === 'mtn') {
        alert(`Redirecting to MTN Mobile Money for ${selectedPlan} plan...`)
        window.location.href = '/mtn-payment-approval'
      }
      setIsProcessing(false)
      setShowPaymentForm(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Agreement Warning */}
        {!hasActiveAgreement && (
          <div className="mb-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="text-yellow-600 mr-3" size={24} />
                <div>
                  <h3 className="text-yellow-800 font-semibold">Agreement Required</h3>
                  <p className="text-yellow-700 text-sm mt-1">
                    You need to have an active agreement with the admin before subscribing to a paid plan.
                  </p>
                  <Link 
                    to="/seller-agreement" 
                    className="inline-flex items-center text-yellow-800 font-medium hover:text-yellow-900 mt-2"
                  >
                    Create Agreement →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Seller Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start selling today with flexible pricing plans. Upgrade anytime as your business grows.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden ${
                plan.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1 rounded-bl-lg">
                  <span className="text-sm font-semibold">POPULAR</span>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    {plan.id === 'free' && <Shield className="text-white" size={32} />}
                    {plan.id === 'monthly' && <Crown className="text-white" size={32} />}
                    {plan.id === 'annual' && <Star className="text-white" size={32} />}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <div className="mt-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {plan.savings}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={18} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.excluded?.map((feature, index) => (
                    <div key={index} className="flex items-start opacity-50">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-3 mt-0.5 flex-shrink-0"></div>
                      <span className="text-gray-500 text-sm line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan.id as 'free' | 'professional' | 'enterprise')}
                  disabled={isProcessing && selectedPlan === plan.id}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    plan.id === 'free'
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : `bg-gradient-to-r ${plan.color} text-white hover:shadow-lg`
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isProcessing && selectedPlan === plan.id ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : plan.id === 'free' ? (
                    'Start Free'
                  ) : (
                    <div className="flex items-center justify-center">
                      <CreditCard className="mr-2" size={18} />
                      Subscribe with PayPal
                    </div>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Modal */}
        {showPaymentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Payment Method</h3>
              
              {/* Payment Method Selection */}
              <div className="space-y-4 mb-6">
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'paypal' | 'mtn')}
                    className="mr-3"
                  />
                  <CreditCard className="mr-3 text-blue-600" size={24} />
                  <div>
                    <div className="font-semibold">PayPal</div>
                    <div className="text-sm text-gray-500">Fast and secure online payment</div>
                  </div>
                </label>
                
                <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="mtn"
                    checked={paymentMethod === 'mtn'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'paypal' | 'mtn')}
                    className="mr-3"
                  />
                  <Smartphone className="mr-3 text-orange-600" size={24} />
                  <div>
                    <div className="font-semibold">MTN Mobile Money</div>
                    <div className="text-sm text-gray-500">SMS approval required</div>
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePayment()}
                  disabled={isProcessing}
                  className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isProcessing ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <>
                      Continue with {paymentMethod === 'paypal' ? 'PayPal' : 'MTN'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feature Comparison */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Compare All Features
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-3 px-4 font-semibold text-purple-600">Professional</th>
                  <th className="text-center py-3 px-4 font-semibold text-orange-600">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Product Listings', free: '5', pro: '100', enterprise: 'Unlimited' },
                  { feature: 'Analytics', free: 'Basic', pro: 'Advanced', enterprise: 'Premium' },
                  { feature: 'Support', free: 'Standard', pro: 'Priority', enterprise: '24/7 Dedicated' },
                  { feature: 'Marketing Tools', free: '❌', pro: '✅', enterprise: '✅' },
                  { feature: 'API Access', free: '❌', pro: '❌', enterprise: '✅' },
                  { feature: 'Custom Branding', free: '❌', pro: '❌', enterprise: '✅' },
                  { feature: 'Priority Placement', free: '❌', pro: '✅', enterprise: '✅' },
                  { feature: 'Bulk Operations', free: '❌', pro: '❌', enterprise: '✅' }
                ].map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="py-3 px-4 text-center text-gray-600">{row.free}</td>
                    <td className="py-3 px-4 text-center text-purple-600 font-semibold">{row.pro}</td>
                    <td className="py-3 px-4 text-center text-orange-600 font-semibold">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                q: 'Can I change my plan later?',
                a: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept PayPal and MTN Mobile Money for all subscription payments. Choose your preferred payment method during checkout.'
              },
              {
                q: 'Is there a setup fee?',
                a: 'No, there are no setup fees. You only pay the monthly or annual subscription cost.'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time. No cancellation fees apply.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-left">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Link
            to="/register"
            className="inline-flex items-center bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Ready to Start Selling?
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SellerSubscription
