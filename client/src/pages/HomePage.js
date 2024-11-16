import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const [bakeries, setBakeries] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate(); // To navigate to the login page after logging out

  useEffect(() => {
    // Fetch bakeries with search query
    fetch(`/api/bakeries?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setBakeries(data.bakeries || []);
      })
      .catch((error) => console.error('Error fetching bakeries:', error));
  }, [search]);

  const logout = () => {
    // Clear the user's token (assuming you're storing it in localStorage)
    localStorage.removeItem('authToken');
    navigate('/login'); // Redirect to the login page after logging out
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome to iDessert</h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search for bakeries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Log out Button */}
      <button
        onClick={logout}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Log Out
      </button>

      <div>
        {bakeries.length === 0 ? (
          <p className="text-gray-600">No bakeries found.</p>
        ) : (
          bakeries.map((bakery) => (
            <div key={bakery.id} className="mb-6">
              <Link to={`/bakery/${bakery.id}`} className="text-xl font-semibold text-blue-600 hover:text-blue-800">
                <h3>{bakery.name}</h3>
              </Link>
              <p className="text-gray-600">{bakery.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
