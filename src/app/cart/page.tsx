'use client'
import React from 'react';
import { useCart } from '../Context';
import Image from 'next/image';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, cartTotal, cartCount } = useCart();

  const handleIncreaseQuantity = (productId: number) => {
    const product = cartItems.find((item) => item.product.id === productId);
    if (product) {
      updateCartItemQuantity(productId, product.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
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
            <button
              className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-950 transition-colors mt-4 sm:mt-0"
              onClick={handleBuy}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;