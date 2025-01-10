import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [bakeries, setBakeries] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [selectedBakery, setSelectedBakery] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch bakeries and recent products when the component mounts
  useEffect(() => {
    if (!token) return;

    // Fetch all bakeries owned by the user
    fetch('/api/bakeries', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.bakeries) {
          setBakeries(data.bakeries);
          // Only set the selectedBakery if it hasn't been set yet
          if (data.bakeries.length > 0 && !selectedBakery) {
            setSelectedBakery(data.bakeries[0]); // Select the first bakery by default
          }
        }
      })
      .catch((err) => {
        setError('Failed to fetch bakeries');
      });
  }, [token, selectedBakery]); // Only re-run if token or selectedBakery changes

  // Function for adding a new bakery
  const handleAddBakery = () => {
    navigate('/add-bakery');
  };

  // Function for removing a bakery
  const handleRemoveBakery = (bakeryId) => {
    fetch(`/api/bakeries/${bakeryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setBakeries(bakeries.filter((bakery) => bakery.id !== bakeryId));
        if (selectedBakery?.id === bakeryId) {
          setSelectedBakery(null); // Clear selected bakery if it was removed
        }
      })
      .catch((err) => {
        setError('Failed to remove bakery');
      });
  };

  // Function for logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Filter bakeries based on search query
  const filteredBakeries = bakeries.filter((bakery) =>
    bakery.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Vertical Menu on the Left */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Your Bakeries</h2>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search bakeries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />

        {/* List of Bakeries */}
        <ul className="space-y-2">
          {filteredBakeries.map((bakery) => (
            <li
              key={bakery.id}
              className={`p-2 rounded-lg cursor-pointer ${
                selectedBakery?.id === bakery.id
                  ? 'bg-orange-100 text-orange-600'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedBakery(bakery)}
            >
              {bakery.name}
            </li>
          ))}
        </ul>

        {/* Add New Bakery Button */}
        <button
          onClick={handleAddBakery}
          className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Add New Bakery
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Selected Bakery Details */}
        {selectedBakery ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">{selectedBakery.name}</h2>
            <p className="text-gray-600 mb-4">{selectedBakery.address}</p>

            {/* Actions */}
            <div className="flex space-x-4">
              <button
                onClick={() => navigate(`/bakery/manage/${selectedBakery.id}`)}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Manage Bakery
              </button>
              <button
                onClick={() => handleRemoveBakery(selectedBakery.id)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Remove Bakery
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Select a bakery to view details.</p>
        )}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;