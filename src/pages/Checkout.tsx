import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Truck, Shield, ArrowLeft, ArrowRight } from 'lucide-react'

const Checkout = () => {
  const [step, setStep] = useState(1)
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  })

  const [shippingMethod, setShippingMethod] = useState('standard')

  const cartItems = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      quantity: 1,
      color: "Black"
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449.99,
      quantity: 2,
      color: "Silver"
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = shippingMethod === 'express' ? 19.99 : (subtotal > 50 ? 0 : 9.99)
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Process payment logic here
    alert('Order placed successfully!')
    setStep(3)
  }

  if (step === 3) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-green-600" size={40} />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="text-left space-y-2 mb-6">
              <p><strong>Order Number:</strong> #ORD-2024-{Math.floor(Math.random() * 10000)}</p>
              <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
              <p><strong>Shipping Method:</strong> {shippingMethod === 'express' ? 'Express (2-3 days)' : 'Standard (5-7 days)'}</p>
              <p><strong>Total Amount:</strong> ${total.toFixed(2)}</p>
            </div>

            <div className="border-t pt-6">
              <p className="text-gray-600 mb-4">
                You will receive an email confirmation shortly with your order details and tracking information.
              </p>
              <Link
                to="/products"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center"
              >
                Continue Shopping
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${step >= 1 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 1 ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className={`w-16 h-1 mx-4 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 2 ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div className={`w-16 h-1 mx-4 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-purple-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= 3 ? 'bg-purple-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="ml-2 font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Australia</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold mb-3">Shipping Method</h3>
                    <div className="space-y-2">
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === 'standard'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Standard Shipping</div>
                          <div className="text-sm text-gray-600">5-7 business days</div>
                        </div>
                        <div className="font-semibold">
                          {subtotal > 50 ? 'FREE' : '$9.99'}
                        </div>
                      </label>
                      <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === 'express'}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="mr-3"
                        />
                        <div className="flex-1">
                          <div className="font-medium">Express Shipping</div>
                          <div className="text-sm text-gray-600">2-3 business days</div>
                        </div>
                        <div className="font-semibold">$19.99</div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
                  >
                    Continue to Payment
                    <ArrowRight className="ml-2" size={20} />
                  </button>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={billingInfo.sameAsShipping}
                        onChange={(e) => setBillingInfo({...billingInfo, sameAsShipping: e.target.checked})}
                        className="mr-2"
                      />
                      Billing address same as shipping
                    </label>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={billingInfo.cardNumber}
                        onChange={(e) => setBillingInfo({...billingInfo, cardNumber: e.target.value})}
                        className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={billingInfo.cardName}
                      onChange={(e) => setBillingInfo({...billingInfo, cardName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={billingInfo.expiryDate}
                        onChange={(e) => setBillingInfo({...billingInfo, expiryDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        value={billingInfo.cvv}
                        onChange={(e) => setBillingInfo({...billingInfo, cvv: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center mb-2">
                      <Shield className="text-purple-600 mr-2" size={20} />
                      <span className="font-semibold">Secure Payment</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                    >
                      <ArrowLeft className="mr-2" size={20} />
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} | Color: {item.color}</p>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="mr-2 text-purple-600" size={16} />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center">
                  <Shield className="mr-2 text-purple-600" size={16} />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="mr-2 text-purple-600" size={16} />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
