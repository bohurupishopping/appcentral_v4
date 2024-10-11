import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-6 text-teal-700 dark:text-teal-300"
        >
          Pincode Finder
        </motion.h1>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex items-center justify-center mb-3">
            <motion.div
              className="relative w-full max-w-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <input
                type="text"
                value={postOfficeName}
                onChange={(e) => setPostOfficeName(e.target.value)}
                placeholder="Enter Post Office Branch Name"
                className="w-full px-4 py-2 rounded-full border-2 border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white text-sm shadow-md transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-500 hover:bg-teal-600 text-white p-1 rounded-full transition-colors duration-200"
                disabled={isLoading}
              >
                <Search className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-center text-sm mb-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200 dark:border-teal-700"
            >
              <h2 className="text-xl font-semibold mb-4 text-teal-700 dark:text-teal-300">Search Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {searchResults.map((postOffice, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg shadow"
                  >
                    <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">{postOffice.Name}</h3>
                    <motion.p whileHover={{ x: 3 }} className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-pink-500" /> <span className="font-medium">Pincode:</span> {postOffice.Pincode}</motion.p>
                    <motion.p whileHover={{ x: 3 }} className="flex items-center"><Building className="w-4 h-4 mr-2 text-green-500" /> <span className="font-medium">District:</span> {postOffice.District}</motion.p>
                    <motion.p whileHover={{ x: 3 }} className="flex items-center"><Mail className="w-4 h-4 mr-2 text-blue-500" /> <span className="font-medium">State:</span> {postOffice.State}</motion.p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200 dark:border-teal-700"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300">Bohurupi Shopping's PIN Code Finder: Your Ultimate Guide</h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            Welcome to Bohurupi Shopping's PIN Code Finder! Easily find pincodes for post offices across India.
          </p>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">Why Use Our PINCode Finder?</h3>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            <li><span className="font-medium">Comprehensive Database:</span> Access a vast database of post offices and their pincodes.</li>
            <li><span className="font-medium">User-Friendly Interface:</span> Easy-to-use interface for seamless navigation.</li>
            <li><span className="font-medium">Accurate Results:</span> Ensure accuracy in pincode search results.</li>
            <li><span className="font-medium">Time-Saving:</span> Quickly find pincodes for multiple post offices.</li>
          </ul>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">How It Works</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>Enter the post office branch name in the search bar above.</li>
            <li>Click the search button or press Enter.</li>
            <li>View the list of matching post offices with their pincodes and details.</li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
};

export default PincodeFinder;
