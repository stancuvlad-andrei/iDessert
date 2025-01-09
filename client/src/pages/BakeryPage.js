import React, { useEffect, useState, useContext } from 'react'; // Add useContext
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import CartContext

function BakeryPage() {
  const { id } = useParams();
  const [bakery, setBakery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useContext(CartContext); // Use the global cart state

  useEffect(() => {
    fetch(`/api/bakeries/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch bakery details');
        }
        return res.json();
      })
      .then((data) => {
        if (data.bakery) {
          setBakery(data.bakery);
        } else {
          setError('Bakery not found');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bakery details:', error);
        setError('Failed to fetch bakery details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">{error}</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700 mt-4">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!bakery) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Bakery not found!</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700 mt-4">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-orange-600">
              iDessert
            </Link>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search for bakeries..."
              className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Account, Cart, and All Bakeries */}
            <div className="flex items-center space-x-6">
              <Link to="/all-bakeries" className="text-gray-700 hover:text-orange-600">
                All Bakeries
              </Link>
              <Link to="/account" className="text-gray-700 hover:text-orange-600">
                My Account
              </Link>
              <Link to="/cart" className="relative">
                <span className="text-gray-700 hover:text-orange-600">Cart</span>
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                  {cart.length} {/* Dynamic cart count */}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">{bakery.name}</h1>
        <p className="text-xl text-gray-600 mb-8">{bakery.description}</p>

        {/* Products Section */}
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Products</h2>
        {bakery.products && bakery.products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {bakery.products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex flex-col">
                <h3 className="text-xl font-semibold text-orange-600">{product.name}</h3>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
                <div className="mt-auto">
                  {product.quantity > 0 && (
                    <button
                      onClick={() => addToCart(product)} // Use the global addToCart function
                      className="mt-4 w-full px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-500">No products available yet.</p>
        )}

        {/* Reviews Section */}
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Reviews</h2>
        {bakery.reviews && bakery.reviews.length > 0 ? (
          <div className="space-y-4 mb-12">
            {bakery.reviews.map((review, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700">{review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white shadow-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-orange-600">
              iDessert
            </Link>

            {/* Text */}
            <p className="text-gray-600">© 2024 iDessert. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BakeryPage;