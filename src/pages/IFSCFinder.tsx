import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Building, MapPin, Phone, CreditCard } from 'lucide-react';

const IFSCFinder: React.FC = () => {
  const [ifscCode, setIfscCode] = useState('');
  const [bankData, setBankData] = useState<any>(null);
  const [error, setError] = useState('');

  const handleIFSCCheck = async () => {
    if (ifscCode.length !== 11) {
      setError('Please enter a valid 11-character IFSC code');
      setBankData(null);
      return;
    }

    try {
      const response = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
      const data = await response.json();

      if (response.ok) {
        setBankData(data);
        setError('');
      } else {
        setError('No records found');
        setBankData(null);
      }
    } catch (error) {
      setError('Error fetching data');
      setBankData(null);
    }
  };

  useEffect(() => {
    if (ifscCode.length === 11) {
      handleIFSCCheck();
    }
  }, [ifscCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-6 text-teal-700 dark:text-teal-300"
        >
          IFSC Details Finder
        </motion.h1>

        <div className="mb-6">
          <div className="flex items-center justify-center mb-3">
            <motion.div
              className="relative w-full max-w-md"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <input
                type="text"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
                placeholder="Enter IFSC Code"
                className="w-full px-4 py-2 rounded-full border-2 border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white text-sm shadow-md transition-all duration-300"
                maxLength={11}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-500 w-5 h-5" />
            </motion.div>
          </div>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-red-500 text-center text-sm"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {bankData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200 dark:border-teal-700"
            >
              <h2 className="text-xl font-semibold mb-4 text-teal-700 dark:text-teal-300">{bankData.BANK}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center"><Building className="w-4 h-4 mr-2 text-teal-500" /> <span className="font-medium">Branch:</span> {bankData.BRANCH}</motion.p>
                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-pink-500" /> <span className="font-medium">City:</span> {bankData.CITY}</motion.p>
                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-purple-500" /> <span className="font-medium">State:</span> {bankData.STATE}</motion.p>
                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center"><Phone className="w-4 h-4 mr-2 text-blue-500" /> <span className="font-medium">Contact:</span> {bankData.CONTACT}</motion.p>
                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center"><CreditCard className="w-4 h-4 mr-2 text-green-500" /> <span className="font-medium">MICR:</span> {bankData.MICR}</motion.p>
                <motion.p whileHover={{ scale: 1.02 }} className="flex items-center"><Search className="w-4 h-4 mr-2 text-yellow-500" /> <span className="font-medium">IFSC:</span> {bankData.IFSC}</motion.p>
              </div>
              <motion.p whileHover={{ scale: 1.01 }} className="mt-4 text-sm"><span className="font-medium">Address:</span> {bankData.ADDRESS}</motion.p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <motion.p whileHover={{ scale: 1.05 }} className="bg-teal-100 dark:bg-teal-800 p-2 rounded-lg text-center"><span className="font-medium">IMPS:</span> {bankData.IMPS ? 'Available' : 'Not Available'}</motion.p>
                <motion.p whileHover={{ scale: 1.05 }} className="bg-cyan-100 dark:bg-cyan-800 p-2 rounded-lg text-center"><span className="font-medium">RTGS:</span> {bankData.RTGS ? 'Available' : 'Not Available'}</motion.p>
                <motion.p whileHover={{ scale: 1.05 }} className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg text-center"><span className="font-medium">NEFT:</span> {bankData.NEFT ? 'Available' : 'Not Available'}</motion.p>
                <motion.p whileHover={{ scale: 1.05 }} className="bg-indigo-100 dark:bg-indigo-800 p-2 rounded-lg text-center"><span className="font-medium">UPI:</span> {bankData.UPI ? 'Available' : 'Not Available'}</motion.p>
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
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300">Bohurupi Shopping's IFSC Checker: Your Ultimate Guide</h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            Welcome to Bohurupi Shopping's IFSC Checker! Find accurate IFSC codes and bank details for all banks in India quickly and easily.
          </p>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">Why Use Our IFSC Checker?</h3>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            <li><span className="font-medium">Comprehensive Database:</span> Access a vast database of IFSC codes and bank details.</li>
            <li><span className="font-medium">User-Friendly Interface:</span> Easy-to-use interface for seamless navigation.</li>
            <li><span className="font-medium">Accurate Results:</span> Ensure accuracy in IFSC code search results.</li>
            <li><span className="font-medium">Time-Saving:</span> Quick access to bank information.</li>
          </ul>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">How It Works</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>Enter the 11-character IFSC code in the search bar above.</li>
            <li>Results will appear automatically as you type.</li>
            <li>Instantly view the corresponding bank and branch details.</li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
};

export default IFSCFinder;
