import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BakeryPage() {
  const { id } = useParams();
  const [bakery, setBakery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/bakeries/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBakery(data.bakery);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bakery details:', error);
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
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-orange-100 flex justify-center items-center">
  <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
    <h1 className="text-5xl font-extrabold text-orange-600 mb-6">{bakery.name}</h1>
    <p className="text-xl text-gray-600 mb-6">{bakery.description}</p>

    <h2 className="text-3xl font-semibold text-orange-600 mt-6 mb-4">Products</h2>
    {bakery.products && bakery.products.length > 0 ? (
      <ul className="list-disc list-inside space-y-4">
        {bakery.products.map((product, index) => (
          <li key={index} className="text-xl text-gray-700">
            {product.name} - <span className="font-semibold text-orange-600">${product.price}</span>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-xl text-gray-500">No products available yet.</p>
    )}

    <h2 className="text-3xl font-semibold text-orange-600 mt-6 mb-4">Reviews</h2>
    {bakery.reviews && bakery.reviews.length > 0 ? (
      <ul className="list-disc list-inside space-y-4">
        {bakery.reviews.map((review, index) => (
          <li key={index} className="text-xl text-gray-700">{review}</li>
        ))}
      </ul>
    ) : (
      <p className="text-xl text-gray-500">No reviews yet.</p>
    )}

    <div className="flex justify-center mt-8">
      <Link
        to="/"
        className="px-8 py-4 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition"
      >
        Back to Home
      </Link>
    </div>
  </div>
</div>

  );
}

export default BakeryPage;
