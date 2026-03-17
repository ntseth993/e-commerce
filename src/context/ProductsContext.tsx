import { createContext, useContext, useState, ReactNode } from 'react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  subcategory?: string
  inStock: boolean
  badge?: string
  seller: string
  sellerId: string
  description: string
  features?: string[]
  stock?: number
  sold?: number
  views?: number
  status?: string
  sku?: string
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews' | 'seller' | 'sellerId'>) => void
  updateProductStock: (id: number, stock: number) => void
  deleteProduct: (id: number) => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export const useProducts = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    // Initial products from the original data
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
      rating: 4.5,
      reviews: 234,
      category: "Electronics",
      subcategory: "Audio",
      inStock: true,
      badge: "Best Seller",
      seller: "TechStore Pro",
      sellerId: "seller1",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery life.",
      features: ["Active Noise Cancellation", "30-hour battery", "Bluetooth 5.0", "Premium cushions"],
      stock: 45,
      sold: 89,
      views: 1234
    },
    {
      id: 2,
      name: "Smart Watch Pro",
      price: 449.99,
      originalPrice: 599.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300",
      rating: 4.8,
      reviews: 189,
      category: "Electronics",
      subcategory: "Wearables",
      inStock: true,
      badge: "New",
      seller: "Gadget World",
      sellerId: "seller2",
      description: "Advanced smartwatch with health monitoring and GPS.",
      features: ["Heart rate monitor", "GPS tracking", "Water resistant", "7-day battery"],
      stock: 30,
      sold: 45,
      views: 856
    },
    {
      id: 3,
      name: "Professional Camera",
      price: 1299.99,
      originalPrice: 1599.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300",
      rating: 4.9,
      reviews: 156,
      category: "Electronics",
      subcategory: "Cameras",
      inStock: true,
      badge: "Premium",
      seller: "Photo Pro",
      sellerId: "seller3",
      description: "Professional DSLR camera with 4K video recording.",
      features: ["4K video", "24MP sensor", "Weather sealed", "Dual card slots"],
      stock: 12,
      sold: 23,
      views: 678
    }
  ])

  const addProduct = (newProductData: Omit<Product, 'id' | 'rating' | 'reviews' | 'seller' | 'sellerId'>) => {
    const newProduct: Product = {
      ...newProductData,
      id: Date.now(),
      rating: 0,
      reviews: 0,
      seller: "Current Seller", // This would come from auth context
      sellerId: "current_seller", // This would come from auth context
      inStock: (newProductData.stock || 0) > 0
    }

    setProducts(prevProducts => [newProduct, ...prevProducts])
  }

  const updateProductStock = (id: number, stock: number) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, stock, inStock: stock > 0 }
          : product
      )
    )
  }

  const deleteProduct = (id: number) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id))
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProductStock, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}
