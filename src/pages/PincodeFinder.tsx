import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Building, Mail } from 'lucide-react';

const PincodeFinder: React.FC = () => {
  const [postOfficeName, setPostOfficeName] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (postOfficeName.trim() === '') {
      setError('Please enter a post office branch name.');
      return;
    }

    setIsLoading(true);
    setError('');
    setSearchResults([]);

    try {
      const response = await fetch(`https://api.postalpincode.in/postoffice/${postOfficeName}`);
      const data = await response.json();

      if (data[0].Status === 'Success') {
        setSearchResults(data[0].PostOffice);
      } else {
        setError(data[0].Message);
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400"
      >
        Pincode Finder
      </motion.h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            value={postOfficeName}
            onChange={(e) => setPostOfficeName(e.target.value)}
            placeholder="Enter Post Office Branch Name"
            className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {searchResults.map((postOffice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">{postOffice.Name}</h2>
              <div className="space-y-2">
                <p className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-pink-500" /> <span className="font-semibold">Pincode:</span> {postOffice.Pincode}</p>
                <p className="flex items-center"><Building className="w-5 h-5 mr-2 text-green-500" /> <span className="font-semibold">District:</span> {postOffice.District}</p>
                <p className="flex items-center"><Mail className="w-5 h-5 mr-2 text-blue-500" /> <span className="font-semibold">State:</span> {postOffice.State}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div className="mt-8 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900 p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-white">Bohurupi Shopping's PIN Code Finder: Your Ultimate Guide</h2>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          Welcome to Bohurupi Shopping's PIN Code Finder! Easily find pincodes for post offices across India.
        </p>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-white">Why Use Our PINCode Finder?</h3>
        <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          <li><strong>Comprehensive Database:</strong> Access a vast database of post offices and their pincodes.</li>
          <li><strong>User-Friendly Interface:</strong> Easy-to-use interface for seamless navigation.</li>
          <li><strong>Accurate Results:</strong> Ensure accuracy in pincode search results.</li>
          <li><strong>Time-Saving:</strong> Quickly find pincodes for multiple post offices.</li>
        </ul>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-white">How It Works</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300">
          <li>Enter the post office branch name in the search bar above.</li>
          <li>Click the "Search" button or press Enter.</li>
          <li>View the list of matching post offices with their pincodes and details.</li>
        </ol>
      </div>
    </div>
  );
};

export default PincodeFinder;