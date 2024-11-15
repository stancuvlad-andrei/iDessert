import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [bakeries, setBakeries] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    fetch(`/api?search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setBakeries(data.bakeries || []);
      });
  }, [search]);

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
