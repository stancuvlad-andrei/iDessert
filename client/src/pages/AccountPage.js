import React, { useEffect, useState, useContext } from 'react'; // Add useContext
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Import CartContext

function AccountPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { cart } = useContext(CartContext); // Use the global cart state

  useEffect(() => {
    // Fetch user details from the backend
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if no token
      return;
    }

    fetch('/api/account', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          alert('Failed to fetch user details');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-gray-800">User not found!</h1>
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
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow w-full">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">My Account</h1>

        {/* Wider Card */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-2">Username</label>
              <p className="text-gray-600">{user.username}</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-2">Email</label>
              <p className="text-gray-600">{user.email}</p>
            </div>

            {/* Role */}
            <div>
              <label className="block text-gray-700 text-lg font-semibold mb-2">Role</label>
              <p className="text-gray-600">{user.role === 'owner' ? 'Bakery Owner' : 'Client'}</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>
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

export default AccountPage;