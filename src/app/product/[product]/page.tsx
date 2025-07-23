"use client"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import type { Id } from "../../../../convex/_generated/dataModel"
import { useRouter } from "next/navigation"
import { useCart } from "@/app/Context"
import { ArrowLeft, Star, Shield, Truck, RefreshCw, Heart } from "lucide-react"
import { useState } from "react"

const Page = ({ params }: { params: { product: Id<"products"> } }) => {
  const router = useRouter()
  const post = useQuery(api.database.getSingleProduct, { Id: params.product })
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!post) {
    return (
      <main className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading product details...</p>
        </div>
      </main>
    )
  }

  const handleBackClick = () => {
    router.back()
  }

  const handleAddToCartClick = () => {
    addToCart(
      {
        id: post._id,
        title: post.title,
        price: post.price,
        description: post.description,
        category: "Category",
        image: post.image,
      },
      quantity,
    )
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-6 lg:px-8 mt-16">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <img
                src={post.image || "/placeholder.png"}
                alt={post.title || "Product Image"}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>

          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {/* Product Title */}
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600">(4.8)</span>
                <span className="text-blue-600 text-sm">127 reviews</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex  space-x-2 justify-center sm:justify-normal items-center sm:items-baseline">
                  <span className="text-4xl font-bold text-blue-600">${post.price.toFixed(2)}</span>
                  <span className="text-lg text-gray-500 line-through">${(post.price * 1.2).toFixed(2)}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold text-center">Save 20%</span>
                </div>
                <p className="text-green-600 text-sm mt-1">✓ In stock and ready to ship</p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{post.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3 text-black">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCartClick}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Add to Cart - ${(post.price * quantity).toFixed(2)}
                </button>

                  <button className="bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors duration-300 w-full">
                    Buy Now
                  </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
