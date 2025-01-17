import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { isAuthenticated } = useAuth();

  // State and context hooks must be called unconditionally
  const [bakeries, setBakeries] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart } = useContext(CartContext);

  // Fetch data only if authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    // Fetch bakeries with good reviews for the carousel
    fetch(`/api/bakeries?reviews=good&search=${search}`)
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

    // Fetch random products from bakeries with good reviews
    fetch('/api/random-products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((error) => {
        console.error('Error fetching random products:', error);
        setError('Failed to fetch random products.');
      });
  }, [search, isAuthenticated]);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
        <h1 className="text-4xl font-bold text-orange-600 mb-8">Welcome to iDessert</h1>

        {/* Bakery Carousel */}
        <div className="mb-12">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            {bakeries.slice(0, 6).map((bakery) => (
              <SwiperSlide key={bakery.id}>
                {/* Wrap the bakery content in a Link */}
                <Link to={`/bakery/${bakery.id}`} className="block">
                  <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                    <h3 className="text-2xl font-semibold text-orange-600">{bakery.name}</h3>
                    <p className="text-gray-600 mt-4 text-lg">{bakery.description}</p>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Random Products from Bakeries with Good Reviews */}
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Featured Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {products.map((product) => (
              <Link to={`/bakery/${product.bakery_id}`} key={product.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition block"
              >
                <div>
                  <h3 className="text-xl font-semibold text-orange-600">{product.name}</h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <p className="text-gray-800 font-semibold mt-2">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-500">No featured products available.</p>
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

export default HomePage;