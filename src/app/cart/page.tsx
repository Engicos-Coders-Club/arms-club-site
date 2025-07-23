"use client"
import type React from "react"
import { useState } from "react"
import { useCart } from "../Context"
import type { Id } from "../../../convex/_generated/dataModel"
import { useUser } from "@clerk/nextjs"
import { Trash2, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react"

const CartPage: React.FC = () => {
  const { isSignedIn, user } = useUser()
  const { cartItems, removeFromCart, updateCartItemQuantity, cartTotal, cartCount } = useCart()
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.emailAddresses[0].emailAddress || "",
    paymentImage: null as File | null,
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form data:", formData)
    setShowForm(false)
    alert("Payment details submitted!")
  }

  const handleIncreaseQuantity = (productId: Id<"products">) => {
    const product = cartItems.find((item) => item.product.id === productId)
    if (product) {
      updateCartItemQuantity(productId, product.quantity + 1)
    }
  }

  const handleDecreaseQuantity = (productId: Id<"products">) => {
    const product = cartItems.find((item) => item.product.id === productId)
    if (product && product.quantity > 1) {
      updateCartItemQuantity(productId, product.quantity - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-6 lg:px-8 mt-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Shopping Cart
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600">
            {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.title}
                        className="w-24 h-24 object-contain rounded-lg bg-gray-50"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.product.title}</h3>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.product.description}</p>
                      <p className="text-blue-600 font-semibold">${item.product.price.toFixed(2)} each</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3 text-black">
                      <button
                        onClick={() => handleDecreaseQuantity(item.product.id)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors duration-300"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.product.id)}
                        className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-colors duration-300"
                      >
                        <Plus className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex items-center justify-between md:flex-col md:items-end space-y-2">
                      <span className="text-xl font-bold text-gray-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300 p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartCount} items)</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${(cartTotal).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg  shadow-lg flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Proceed to Checkout</span>
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Secure checkout powered by SSL encryption</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-black">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-lg w-full mx-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Payment</h2>

              <div className="text-center mb-6">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location.href}&size=200x200`}
                  alt="QR Code"
                  className="h-32 mx-auto mb-4 rounded-lg"
                />
                <p className="text-sm text-gray-600">Scan QR code to pay</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="file"
                  name="paymentImage"
                  onChange={handleFormChange}
                  accept="image/*"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="flex space-x-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-3 rounded-xl font-semibold duration-300"
                  >
                    Submit Payment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-400 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
