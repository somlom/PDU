export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 py-6">
        <div className="container mx-auto text-white text-center">
          <h1 className="text-3xl font-bold">Welcome to Our PDU System</h1>
          <p className="mt-2">
            Efficient power management for your infrastructure
          </p>
        </div>
      </header>

      {/* Carousel */}
      <div className="carousel-container overflow-hidden">
        <div>
          <img src={"/variant1.png"} alt="PDU" />
        </div>
        <div>
          <img src={"/variant1.png"} alt="PDU" />
        </div>
        <div>
          <img src={"/variant1.png"} alt="PDU" />
        </div>
      </div>

      {/* Features */}
      <section className="container mx-auto py-12">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Key Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Feature 1</h3>
            <p className="text-gray-700">Description of feature 1...</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Feature 2</h3>
            <p className="text-gray-700">Description of feature 2...</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Feature 3</h3>
            <p className="text-gray-700">Description of feature 3...</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
          <p className="mb-8">Sign up for our PDU system now!</p>
          <a
            href="/signup"
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-lg text-lg font-semibold inline-block transition duration-300"
          >
            Sign Up
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 text-white text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
