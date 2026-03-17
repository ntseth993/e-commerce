import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Star, Clock, Zap } from 'lucide-react'

const Deals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 42,
    seconds: 30
  })

  const deals = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 199.99,
      originalPrice: 399.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      rating: 4.5,
      reviews: 234,
      category: "Electronics",
      endsIn: "2 days",
      stock: 15
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 299.99,
      originalPrice: 599.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      rating: 4.8,
      reviews: 189,
      category: "Electronics",
      endsIn: "1 day",
      stock: 8
    },
    {
      id: 3,
      name: "Designer Leather Bag",
      price: 99.99,
      originalPrice: 249.99,
      discount: 60,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
      rating: 4.3,
      reviews: 98,
      category: "Fashion",
      endsIn: "3 days",
      stock: 5
    },
    {
      id: 4,
      name: "Professional Camera",
      price: 899.99,
      originalPrice: 1599.99,
      discount: 44,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300",
      rating: 4.9,
      reviews: 156,
      category: "Electronics",
      endsIn: "12 hours",
      stock: 3
    },
    {
      id: 5,
      name: "Running Shoes",
      price: 59.99,
      originalPrice: 119.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300",
      rating: 4.2,
      reviews: 67,
      category: "Sports",
      endsIn: "2 days",
      stock: 20
    },
    {
      id: 6,
      name: "Coffee Maker Deluxe",
      price: 149.99,
      originalPrice: 299.99,
      discount: 50,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300",
      rating: 4.4,
      reviews: 178,
      category: "Home & Garden",
      endsIn: "1 day",
      stock: 12
    }
  ]

  const flashDeals = deals.slice(0, 3)
  const allDeals = deals

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hot Deals 🔥</h1>
          <p className="text-xl text-gray-600 mb-8">
            Limited time offers - Don't miss out on these amazing deals!
          </p>
          
          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl p-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-center">
              <Clock className="mr-2" size={20} />
              Flash Sale Ends In:
            </h2>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                  <div className="text-xs">Days</div>
                </div>
              </div>
              <div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs">Hours</div>
                </div>
              </div>
              <div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs">Minutes</div>
                </div>
              </div>
              <div>
                <div className="bg-white bg-opacity-20 rounded-lg p-3">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Flash Deals */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center">
              <Zap className="mr-2 text-yellow-500" size={28} />
              Flash Deals
            </h2>
            <div className="text-sm text-gray-600">
              Limited stock - Only {flashDeals.reduce((sum, deal) => sum + deal.stock, 0)} items left
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
                {/* Deal Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                    -{deal.discount}%
                  </span>
                </div>
                
                {/* Low Stock Warning */}
                {deal.stock <= 5 && (
                  <div className="absolute top-2 right-2 z-10">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                      Only {deal.stock} left!
                    </span>
                  </div>
                )}

                <Link to={`/product/${deal.id}`}>
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{deal.category}</p>
                  <Link to={`/product/${deal.id}`}>
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                      {deal.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(deal.rating) ? 'fill-current' : ''}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({deal.reviews})</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-xl font-bold text-purple-600">${deal.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${deal.originalPrice}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold text-sm">
                      Save ${(deal.originalPrice - deal.price).toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-3">
                    <Clock size={12} className="inline mr-1" />
                    Ends in {deal.endsIn}
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <ShoppingBag size={16} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Deals */}
        <section>
          <h2 className="text-2xl font-bold mb-8">All Deals</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDeals.map((deal) => (
              <div key={deal.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow relative">
                {/* Deal Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full font-semibold">
                    -{deal.discount}%
                  </span>
                </div>

                <Link to={`/product/${deal.id}`}>
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{deal.category}</p>
                  <Link to={`/product/${deal.id}`}>
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                      {deal.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(deal.rating) ? 'fill-current' : ''}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({deal.reviews})</span>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-xl font-bold text-purple-600">${deal.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${deal.originalPrice}
                      </span>
                    </div>
                    <span className="text-green-600 font-semibold text-sm">
                      Save ${(deal.originalPrice - deal.price).toFixed(2)}
                    </span>
                  </div>
                  
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center">
                    <ShoppingBag size={16} className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mt-16 bg-purple-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="mb-6">Subscribe to get exclusive deals and early access to sales</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Deals
