import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Heart, Eye, Star, ShoppingCart, Plus, ShoppingBag } from 'lucide-react'
import { useProducts } from '../context/ProductsContext'

const Products = () => {
  const { products } = useProducts()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')

  const categories = ['all', 'Electronics', 'Fashion', 'Sports', 'Home & Garden', 'Books']
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-500', label: '$100 - $500' },
    { value: '500+', label: 'Over $500' }
  ]

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    
    let matchesPrice = true
    if (priceRange !== 'all') {
      if (priceRange === '0-50') matchesPrice = product.price < 50
      else if (priceRange === '50-100') matchesPrice = product.price >= 50 && product.price < 100
      else if (priceRange === '100-500') matchesPrice = product.price >= 100 && product.price < 500
      else if (priceRange === '500+') matchesPrice = product.price >= 500
    }
    
    return matchesSearch && matchesCategory && matchesPrice
  })

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection of premium products</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {product.badge}
                  </span>
                )}
                
                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                  <Heart className="text-gray-400 hover:text-red-500" size={16} />
                </button>
                
                {/* Out of Stock Overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                    <span className="bg-white text-gray-800 px-4 py-2 rounded font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold mb-2 line-clamp-2 hover:text-purple-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    ({product.reviews})
                  </span>
                </div>
                
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <span className="text-xl font-bold text-purple-600">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-green-600 font-semibold">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>
                
                <button 
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    product.inStock 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                >
                  {product.inStock ? (
                    <span className="flex items-center justify-center">
                      <ShoppingBag size={16} className="mr-2" />
                      Add to Cart
                    </span>
                  ) : (
                    'Out of Stock'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button 
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setPriceRange('all')
              }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
