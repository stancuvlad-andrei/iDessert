import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BakeryPage() {
  const { id } = useParams();
  const [bakery, setBakery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api')
      .then((res) => res.json())
      .then((data) => {
        const bakeryData = data.bakeries.find((b) => b.id === parseInt(id));
        setBakery(bakeryData);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600">Loading...</p>
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
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{bakery.name}</h1>
      <p className="text-lg text-gray-600">{bakery.description}</p>

      <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">Reviews</h2>
      {bakery.reviews.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {bakery.reviews.map((review, index) => (
            <li key={index} className="text-gray-700">
              {review}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}

      <Link
        to="/"
        className="inline-block mt-8 px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default BakeryPage;
