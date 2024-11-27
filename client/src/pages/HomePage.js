import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const [bakeries, setBakeries] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

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
    localStorage.removeItem('authToken');
    navigate('/login'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 flex justify-center items-center">
  <div className="w-full max-w-7xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md flex flex-col pb-10">
    <h1 className="text-4xl font-extrabold text-orange-600 mb-6">Welcome to iDessert</h1>

    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search for bakeries..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-3 mb-6 border border-orange-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
    />

    <div className="flex-grow">
      {bakeries.length === 0 ? (
        <p className="text-orange-700">No bakeries found.</p>
      ) : (
        bakeries.map((bakery) => (
          <div
            key={bakery.id}
            className="mb-6 p-4 bg-white rounded-lg shadow hover:shadow-lg hover:border-2 hover:border-orange-400 transition-all"
          >
            <Link
              to={`/bakery/${bakery.id}`}
              className="text-2xl font-semibold text-orange-600 hover:text-orange-700"
            >
              <h3>{bakery.name}</h3>
            </Link>
            <p className="text-gray-600 mt-2">{bakery.description}</p>
          </div>
        ))
      )}
    </div>

    <button
      onClick={logout}
      className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 mx-auto"
    >
      Log Out
    </button>
  </div>
</div>

  );
}

export default HomePage;
