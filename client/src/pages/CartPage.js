import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  // Calculate the total price of the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Function to handle checkout
  const handleCheckout = async () => {
    try {
      // Ensure that each item in the cart has a bakeryId and convert price to number
      const cartWithBakeryId = cart.map((item) => ({
        ...item,
        bakeryId: item.bakery_id,
        price: parseFloat(item.price),
      }));
  
      // Send the cart data and bakeryId to the backend
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart: cartWithBakeryId, bakeryId: cartWithBakeryId[0]?.bakeryId }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to process checkout');
      }
  
      // Wait for backend confirmation of successful logging
      const result = await response.json();
      if (result.message !== 'Checkout successful') {
        throw new Error('Logging failed on the backend');
      }
  
      // Clear the cart after successful logging
      clearCart();
      alert('Purchase successful! Your cart has been cleared.');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process checkout. Please try again.');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar and other content */}
      {/* Main Content */}
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">Your Cart</h1>

        {cart.length > 0 ? (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-orange-600">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 px-2 py-1 border rounded-lg text-center"
                      min="1"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-2xl font-semibold text-orange-600">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </>
        ) : (
          <p className="text-xl text-gray-500">Your cart is empty.</p>
        )}

        <div className="flex justify-center mt-8 space-x-4">
          <Link
            to="/"
            className="px-8 py-4 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
          >
            Continue Shopping
          </Link>
          {cart.length > 0 && (
            <button
              onClick={handleCheckout}
              className="px-8 py-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;