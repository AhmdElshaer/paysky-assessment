export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Product Name</h2>
        <p className="text-gray-700 mb-4">Product description goes here.</p>
        <p className="text-lg font-bold text-green-600">$99.99</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Add to Cart
        </button>
      </div>
    </div>)
};
