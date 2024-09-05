'use client'
import { useCart } from '../Context';

const page = () => {
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
    <div className='bg-white text-black h-screen w-full flex justify-center items-center'>
<div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-4">
                <img src={item.product.image} alt={item.product.title} className="w-16 h-16 object-cover" />
                <div>
                  <h2 className="text-lg font-medium">{item.product.title}</h2>
                  <p>${item.product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="px-2 py-1 bg-gray-200 text-gray-700"
                  onClick={() => handleDecreaseQuantity(item.product.id)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 text-gray-700"
                  onClick={() => handleIncreaseQuantity(item.product.id)}
                >
                  +
                </button>
              </div>
              <div>
                <button
                  className="px-4 py-2 bg-red-500 text-white"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <div>
              <h2 className="text-xl font-semibold">Total Items: {cartCount}</h2>
              <h2 className="text-xl font-semibold">Total Price: ${cartTotal.toFixed(2)}</h2>
            </div>
            <button
              className="px-6 py-3 bg-blue-500 text-white rounded-lg"
              onClick={handleBuy}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default page