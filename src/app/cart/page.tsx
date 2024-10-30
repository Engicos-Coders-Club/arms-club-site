'use client'
import React, { useState } from 'react';
import { useCart } from '../Context';
import { Id } from '../../../convex/_generated/dataModel';
import { useUser } from '@clerk/nextjs';

const CartPage: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const { cartItems, removeFromCart, updateCartItemQuantity, cartTotal, cartCount } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.emailAddresses[0].emailAddress || "",
    paymentImage: null as File | null,
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setShowForm(false);
    alert("Payment details submitted!");
  };

  const handleIncreaseQuantity = (productId:Id<"products">) => {
    const product = cartItems.find((item) => item.product.id === productId);
    if (product) {
      updateCartItemQuantity(productId, product.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId:Id<"products">) => {
    const product = cartItems.find((item) => item.product.id === productId);
    if (product && product.quantity > 1) {
      updateCartItemQuantity(productId, product.quantity - 1);
    }
  };

  const handleBuy = () => {
    alert("Proceeding to Checkout!");
  };

  return (
    <div className="bg-white text-black min-h-screen w-full flex flex-col">
      <div className="container mx-auto p-4 flex-grow mt-20">
        <h1 className="text-3xl font-semibold mb-6 text-center uppercase">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-xl border-b">
                  <th className="p-2 text-center font-medium">Description</th>
                  <th className="p-2 text-center font-medium">Quantity</th>
                  <th className="p-2 text-center font-medium">Remove</th>
                  <th className="p-2 text-center font-medium">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.product.id} className="border-b">
                    <td className="p-2">
                      <div className="flex items-center space-x-4">
                        <div className="size-20 relative">
                          <img 
                          src={item.product.image} 
                          alt={item.product.title}
                          className='object-contain h-20 w-20'
                          />
                        </div>
                        <div>
                          <h2 className="font-medium">{item.product.title}</h2>
                          <p className="text-sm text-gray-500">${item.product.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="px-4 py-3 bg-gray-200 text-gray-700 rounded"
                          onClick={() => handleDecreaseQuantity(item.product.id)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="px-4 py-3 bg-blue-800 text-gray-200 rounded"
                          onClick={() => handleIncreaseQuantity(item.product.id)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <button
                        className="px-4 py-3 bg-white text-black rounded  transition-colors border font-mono"
                        onClick={() => removeFromCart(item.product.id)}
                      >
                       x
                      </button>
                    </td>
                    <td className="p-4 text-center font-medium ">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="bg-gray-100 p-4 mt-6">
          <div className="container mx-auto flex justify-between items-center flex-wrap">
            <div>
              <h2 className="text-xl font-semibold">Total Items: {cartCount}</h2>
              <h2 className="text-xl font-semibold">Total Price: ${cartTotal.toFixed(2)}</h2>
            </div>
            <button onClick={() => setShowForm(true)} className="px-6 py-3 bg-blue-900 text-white rounded-lg">
          Proceed to Checkout
        </button>
          </div>
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-4">Complete Payment</h2>
            <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${window.location.href}&amp;size=200x200`} alt="QR Code" className="h-32 mx-auto mb-4" />
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full p-3 border rounded-md"
                required
              />
              <input
                type="file"
                name="paymentImage"
                onChange={handleFormChange}
                accept="image/*"
                className="w-full p-3 border rounded-md"
                required
              />
              <div className="flex justify-end space-x-4">
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Submit
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded-md">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;