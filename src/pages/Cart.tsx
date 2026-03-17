import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react'

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200",
      quantity: 1,
      size: "One Size",
      color: "Black"
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449.99,
      originalPrice: 599.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200",
      quantity: 2,
      size: "42mm",
      color: "Silver"
    },
    {
      id: 3,
      name: "Designer Leather Bag",
      price: 189.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200",
      quantity: 1,
      size: "One Size",
      color: "Brown"
    }
  ])

  const [promoCode, setPromoCode] = useState('')

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
    } else {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const savings = cartItems.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      alert('Promo code applied! 10% discount added.')
    } else {
      alert('Invalid promo code')
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-gray-400 mb-4">
            <ShoppingBag size={64} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet
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
    )
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-semibold hover:text-purple-600 transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500">
                            {item.size !== "One Size" && `Size: ${item.size}`}
                            {item.size !== "One Size" && item.color && " | "}
                            {item.color && `Color: ${item.color}`}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        {/* Quantity */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                          {item.originalPrice > item.price && (
                            <div className="text-sm text-gray-400 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/products"
                className="text-purple-600 hover:text-purple-700 font-semibold inline-flex items-center"
              >
                <ArrowRight className="mr-2 rotate-180" size={20} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                
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

              {/* Free Shipping Notice */}
              {subtotal < 50 && (
                <div className="bg-purple-50 text-purple-700 p-3 rounded-lg mb-6 text-sm">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2" size={20} />
              </Link>

              {/* Security Badge */}
              <div className="mt-6 text-center text-sm text-gray-500">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                  Secure Checkout
                </div>
                <p>Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
