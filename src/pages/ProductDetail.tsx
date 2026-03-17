import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingBag, Heart, Star, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  // Mock product data - in real app, this would come from API
  const product = {
    id: parseInt(id || '1'),
    name: "Premium Wireless Headphones",
    price: 299.99,
    originalPrice: 399.99,
    description: "Experience premium sound quality with our flagship wireless headphones. Featuring advanced noise cancellation, 30-hour battery life, and superior comfort for all-day wear.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
      "https://images.unsplash.com/photo-1487215048571-23175f95d6b4?w=600"
    ],
    rating: 4.5,
    reviews: 234,
    category: "Electronics",
    inStock: true,
    badge: "Best Seller",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather cushions",
      "Bluetooth 5.0",
      "Voice assistant compatible"
    ],
    specifications: {
      "Brand": "AudioTech Pro",
      "Model": "WH-1000XM5",
      "Weight": "250g",
      "Battery Life": "30 hours",
      "Charging Time": "3 hours",
      "Connectivity": "Bluetooth 5.0, 3.5mm jack"
    },
    sizes: ["One Size"],
    colors: ["Black", "Silver", "Midnight Blue"]
  }

  const relatedProducts = [
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      rating: 4.8
    },
    {
      id: 3,
      name: "Designer Leather Bag",
      price: 189.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
      rating: 4.3
    },
    {
      id: 4,
      name: "Professional Camera",
      price: 1299.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300",
      rating: 4.9
    }
  ]

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert('Please select a size')
      return
    }
    if (!selectedColor && product.colors.length > 0) {
      alert('Please select a color')
      return
    }
    
    // Add to cart logic here
    alert(`Added ${quantity} x ${product.name} to cart`)
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="aspect-square overflow-hidden rounded-lg mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-purple-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Badge */}
            {product.badge && (
              <span className="inline-block bg-purple-600 text-white text-sm px-3 py-1 rounded-full mb-4">
                {product.badge}
              </span>
            )}

            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? 'fill-current' : ''}
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-purple-600">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="ml-3 text-xl text-gray-400 line-through">${product.originalPrice}</span>
                )}
              </div>
              {product.originalPrice > product.price && (
                <span className="text-green-600 font-semibold">
                  Save ${product.originalPrice - product.price} ({Math.round((1 - product.price / product.originalPrice) * 100)}% off)
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-8">{product.description}</p>

            {/* Options */}
            <div className="mb-8">
              {/* Size */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          selectedSize === size
                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg transition-colors ${
                          selectedColor === color
                            ? 'border-purple-600 bg-purple-50 text-purple-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border border-gray-300 rounded-lg py-2"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center ${
                  product.inStock
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={20} className="mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Heart size={20} />
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-8">
              <h3 className="font-semibold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-sm">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-sm">Secure Payment</p>
              </div>
              <div className="text-center">
                <ArrowLeft className="mx-auto mb-2 text-purple-600" size={24} />
                <p className="text-sm">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-16">
          <div className="border-b mb-8">
            <nav className="flex space-x-8">
              <button className="pb-4 border-b-2 border-purple-600 text-purple-600 font-semibold">
                Description
              </button>
              <button className="pb-4 text-gray-500 hover:text-gray-700">
                Specifications
              </button>
              <button className="pb-4 text-gray-500 hover:text-gray-700">
                Reviews ({product.reviews})
              </button>
            </nav>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Product Description</h3>
            <p className="text-gray-600 mb-4">
              {product.description}
            </p>
            <p className="text-gray-600 mb-4">
              Our premium wireless headphones are designed for audiophiles who demand the best in sound quality and comfort. 
              With advanced noise cancellation technology, you can immerse yourself in your music without distractions.
            </p>
            <h4 className="text-lg font-semibold mb-3">What's in the Box</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Premium Wireless Headphones</li>
              <li>Carrying Case</li>
              <li>Audio Cable (3.5mm)</li>
              <li>USB Charging Cable</li>
              <li>Airplane Adapter</li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Link to={`/product/${relatedProduct.id}`}>
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(relatedProduct.rating) ? 'fill-current' : ''}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({relatedProduct.rating})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-purple-600">${relatedProduct.price}</span>
                      <button className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors">
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
