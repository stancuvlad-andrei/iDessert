import React, { useEffect, useState, useContext } from 'react'; // Add useContext
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import CartContext

function AllBakeriesPage() {
  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const { cart } = useContext(CartContext); // Use the global cart state

  useEffect(() => {
    // Fetch all bakeries
    fetch(`/api/bakeries?search=${search}`) // Include search query
      .then((res) => res.json())
      .then((data) => {
        setBakeries(data.bakeries || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bakeries:', error);
        setError('Failed to fetch bakeries.');
        setLoading(false);
      });
  }, [search]); // Re-fetch when search changes

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-red-600">{error}</p>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Account, Cart, and All Bakeries */}
            <div className="flex items-center space-x-6">
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
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">All Bakeries</h1>

        {/* Display all bakeries */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
          {bakeries.map((bakery) => (
            <Link to={`/bakery/${bakery.id}`} key={bakery.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition block"
            >
              <div>
                <h3 className="text-xl font-semibold text-orange-600">{bakery.name}</h3>
                <p className="text-gray-600 mt-2">{bakery.description}</p>
              </div>
            </Link>
          ))}
        </div>
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

export default AllBakeriesPage;