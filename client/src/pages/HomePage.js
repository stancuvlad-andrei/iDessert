import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [bakeries, setBakeries] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setBakeries(data.bakeries || []));
  }, []);

  return (
    <div className="text-center m-5">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to the Bakery Finder</h1>
      <div className="mt-8">
        {bakeries.length === 0 ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          bakeries.map((bakery) => (
            <div key={bakery.id} className="mb-5 p-4 border rounded-md shadow-lg">
              <Link
                to={`/bakery/${bakery.id}`}
                className="text-blue-500 hover:text-blue-700 text-2xl"
              >
                {bakery.name}
              </Link>
              <p className="text-gray-600 mt-2">{bakery.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
