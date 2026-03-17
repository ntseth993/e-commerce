import { Link } from 'react-router-dom'
import { ArrowRight, Star, ShoppingBag, TrendingUp, Truck, Shield, Sparkles, Zap, Heart, Eye, Users } from 'lucide-react'
import { products } from '../data/products'

const Home = () => {
  const featuredProducts = products.slice(0, 4)

  const categories = [
    { name: "Electronics", icon: "💻", count: 245, color: "from-blue-500 to-blue-600" },
    { name: "Fashion", icon: "👕", count: 189, color: "from-pink-500 to-pink-600" },
    { name: "Home & Garden", icon: "🏠", count: 156, color: "from-green-500 to-green-600" },
    { name: "Sports", icon: "⚽", count: 98, color: "from-orange-500 to-orange-600" },
    { name: "Books", icon: "📚", count: 67, color: "from-purple-500 to-purple-600" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section with Modern Design */}
      <section className="relative overflow-hidden min-h-screen">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30"></div>
        </div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-2v-4h-2v4h-2v4h2v-4h2v-4h2v4h2v-4h2v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex items-center">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce">
              <Sparkles className="text-yellow-300 mr-2" size={20} />
              <span className="text-white font-medium">New Collection 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight animate-fade-in-up">
              Discover Amazing
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
                Products
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '200ms'}}>
              Shop the latest trends with exclusive deals and premium quality
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '400ms'}}>
              <Link
                to="/products"
                className="group relative bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
              >
                <span className="flex items-center">
                  <ShoppingBag className="mr-2" size={20} />
                  Shop Now
                </span>
                <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              
              <Link
                to="/deals"
                className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 animate-pulse" style={{animationDelay: '200ms'}}
              >
                <span className="flex items-center">
                  <Zap className="mr-2" size={20} />
                  Hot Deals
                </span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Animated Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 backdrop-blur-sm rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full animate-bounce-delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/5 backdrop-blur-sm rounded-full animate-ping-delay-2000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <ShoppingBag className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10K+</h3>
              <p className="text-gray-600">Premium Products</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5K+</h3>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Secure Shopping</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
              <p className="text-gray-600">Fast Delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Explore our wide range of products</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category.name.toLowerCase()}`}
                className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border-2 border-transparent hover:border-purple-200`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="relative p-6 text-center">
                  <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-500">{category.count} products</p>
                  
                  {/* Hover Icon */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="text-purple-600" size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
            <Link
              to="/products"
              className="text-purple-600 hover:text-purple-700 font-semibold flex items-center group"
            >
              View All Products
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  {/* Product Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                          {product.badge}
                        </span>
                      </div>
                    )}
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                        <Heart className="text-gray-600 hover:text-red-500" size={16} />
                      </button>
                      <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                        <Eye className="text-gray-600 hover:text-purple-600" size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                      {product.rating && (
                        <div className="flex items-center">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <button className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-all duration-300 transform hover:scale-110">
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ShopHub</h2>
            <p className="text-xl text-gray-600">Experience the best in online shopping</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Free Shipping</h3>
              <p className="text-gray-600 leading-relaxed">Free shipping on all orders over $50. Fast and reliable delivery to your doorstep.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Shield className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">100% secure payment process with SSL encryption. Your data is always protected.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="text-white" size={40} />
              </div>
              <h3 className="text-xl font-bold mb-3">Best Prices</h3>
              <p className="text-gray-600 leading-relaxed">Guaranteed best prices online. Price match guarantee on all products.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-2v-4h-2v4h-2v4h2v-4h2v-4h2v4h2v-4h2v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="text-yellow-300 mr-2" size={20} />
            <span className="text-white font-medium">Exclusive Offers</span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Get Exclusive Deals
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be first to know about new products and special offers
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/90 backdrop-blur-sm"
            />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from verified buyers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">John Doe</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Amazing shopping experience! Fast delivery and excellent customer service. The product quality exceeded my expectations."
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Verified Buyer • Electronics
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  SM
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Miller</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Love the variety of products and competitive prices. The return process is hassle-free. Will definitely shop again!"
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Verified Buyer • Fashion
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  MJ
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Mike Johnson</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-current" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                "Best online shopping platform I've used. Great deals, secure payments, and amazing customer support!"
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Verified Buyer • Sports
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Trending Now 🔥</h2>
              <p className="text-gray-600">Hot products everyone's talking about</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-purple-100 text-purple-600 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                All
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                Today
              </button>
              <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                This Week
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(4, 8).map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden border-2 border-transparent hover:border-red-200">
                <Link to={`/product/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Trending Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center">
                        🔥 Trending
                      </span>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                        <Heart className="text-gray-600 hover:text-red-500" size={16} />
                      </button>
                      <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-colors">
                        <Eye className="text-gray-600 hover:text-purple-600" size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                      
                      <button className="bg-red-500 text-white p-3 rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-110">
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                    
                    {/* Sales Count */}
                    <div className="mt-3 text-xs text-gray-500">
                      🔥 {Math.floor(Math.random() * 500) + 100} sold in last 24h
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Brands</h2>
            <p className="text-xl text-gray-600">Shop from your favorite brands</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['TechPro', 'FashionHub', 'SportMax', 'HomeStyle', 'BookWorld', 'EcoLife'].map((brand, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center hover:shadow-2xl transition-shadow group cursor-pointer">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl flex items-center justify-center mb-3 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300">
                    <span className="text-2xl font-bold text-gray-600 group-hover:text-purple-600">
                      {brand.substring(0, 2)}
                    </span>
                  </div>
                  <p className="font-medium text-gray-700">{brand}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-2v-4h-2v4h-2v4h2v-4h2v-4h2v4h2v-4h2v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Zap className="text-yellow-300 mr-2" size={20} />
                <span className="text-white font-medium">Mobile App</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6">
                Shop Anytime, Anywhere
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Download our mobile app for exclusive deals, faster checkout, and personalized recommendations. Available on iOS and Android.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white">Exclusive mobile-only deals</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white">Faster checkout with saved cards</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white">Real-time order tracking</span>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <span className="text-white">Push notifications for deals</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center">
                  <span className="mr-2">🍎</span>
                  Download for iOS
                </button>
                <button className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center">
                  <span className="mr-2">🤖</span>
                  Download for Android
                </button>
              </div>
            </div>
            
            <div className="relative">
              {/* Mock Phone */}
              <div className="w-64 h-96 bg-gray-900 rounded-3xl mx-auto relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl"></div>
                <div className="bg-white h-full rounded-2xl mt-6">
                  <div className="p-4">
                    <div className="h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mb-4"></div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="h-16 bg-gray-100 rounded-lg"></div>
                      <div className="h-16 bg-gray-100 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-10 -left-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full animate-bounce"></div>
              <div className="absolute bottom-10 -right-10 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about ShopHub</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                q: "How long does shipping take?",
                a: "Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. Free shipping on orders over $50."
              },
              {
                q: "What is your return policy?",
                a: "We offer 30-day hassle-free returns. Items must be unused and in original packaging. Refunds processed within 5-7 business days."
              },
              {
                q: "How do I track my order?",
                a: "Once your order ships, you'll receive a tracking number via email. You can track your order on our website or mobile app."
              },
              {
                q: "Is my payment information secure?",
                a: "Yes! We use SSL encryption and are PCI compliant. Your payment information is never stored on our servers."
              },
              {
                q: "Do you offer international shipping?",
                a: "Yes, we ship to over 100 countries worldwide. International shipping times and rates vary by location."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <span className="text-purple-600 text-2xl">+</span>
                </button>
                <div className="px-6 py-4 text-gray-600 border-t">
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Methods</h2>
            <p className="text-gray-600">We accept all major payment methods</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                <span className="text-2xl font-bold text-blue-600">PayPal</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">PayPal</h3>
              <p className="text-sm text-gray-600">Fast & secure</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                <span className="text-2xl font-bold text-blue-700">Visa</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Visa</h3>
              <p className="text-sm text-gray-600">Credit & debit</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                <span className="text-2xl font-bold text-red-600">MC</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mastercard</h3>
              <p className="text-sm text-gray-600">Worldwide accepted</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                <span className="text-2xl font-bold text-orange-600">MTN</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">MTN Mobile Money</h3>
              <p className="text-sm text-gray-600">Mobile payment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop with Confidence</h2>
            <p className="text-gray-600">Trusted by millions of customers worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={40} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">SSL Secured</h3>
              <p className="text-sm text-gray-600">256-bit encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="text-blue-600" size={40} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Express shipping</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-600" size={40} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Buyer Protection</h3>
              <p className="text-sm text-gray-600">Money-back guarantee</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-orange-600" size={40} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
