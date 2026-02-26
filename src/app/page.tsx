'use client';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold">Money Press</h1>
            <div className="hidden md:flex gap-6">
              <a href="#products" className="hover:text-secondary transition">Products</a>
              <a href="#about" className="hover:text-secondary transition">About</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-secondary hover:bg-opacity-90 px-4 py-2 rounded-lg transition">
              Cart
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-4">Welcome to Money Press</h2>
          <p className="text-xl text-gray-200 mb-8">Discover quality products at unbeatable prices</p>
          <button className="bg-secondary hover:bg-opacity-90 px-8 py-3 rounded-lg text-lg font-semibold transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-4 text-primary">Featured Products</h2>
          <p className="text-gray-600 mb-12">Coming soon - our full product catalog</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Sample Product Card */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Product Image</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Product {i}</h3>
                  <p className="text-gray-600 text-sm mb-3">Quality item for your needs</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-secondary">$49.99</span>
                    <button className="bg-primary text-white px-3 py-1 rounded hover:bg-primary/90 transition">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">Money Press</h4>
              <p className="text-gray-300">Your trusted dropshipping store</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-secondary transition">About Us</a></li>
                <li><a href="#" className="hover:text-secondary transition">Contact</a></li>
                <li><a href="#" className="hover:text-secondary transition">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-secondary transition">Support</a></li>
                <li><a href="#" className="hover:text-secondary transition">Shipping Info</a></li>
                <li><a href="#" className="hover:text-secondary transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8">
            <p className="text-center text-gray-300">&copy; 2026 Money Press. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
