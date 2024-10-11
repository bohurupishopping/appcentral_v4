import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Building, Globe, Search } from 'lucide-react';

const PincodeDetails: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [pincodeData, setPincodeData] = useState<any>(null);
  const [error, setError] = useState('');

  const handlePincodeCheck = async () => {
    if (pincode.length !== 6) {
      setError('Please enter a valid 6-digit PIN code');
      setPincodeData(null);
      return;
    }

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data.length > 0 && data[0].Status === 'Success') {
        setPincodeData(data[0]);
        setError('');
      } else {
        setError('No records found');
        setPincodeData(null);
      }
    } catch (error) {
      setError('Error fetching data');
      setPincodeData(null);
    }
  };

  useEffect(() => {
    if (pincode.length === 6) {
      handlePincodeCheck();
    }
  }, [pincode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-center mb-6 text-teal-700 dark:text-teal-300"
        >
          Pincode Details Checker
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
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter PIN code"
                className="w-full px-4 py-2 rounded-full border-2 border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:text-white text-sm shadow-md transition-all duration-300"
                maxLength={6}
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
          {pincodeData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-teal-200 dark:border-teal-700"
            >
              <h2 className="text-xl font-semibold mb-4 text-teal-700 dark:text-teal-300">Post Office Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {pincodeData.PostOffice.map((office: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="bg-teal-50 dark:bg-teal-900 p-4 rounded-lg shadow"
                  >
                    <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-2">{office.Name}</h3>
                    <motion.p whileHover={{ x: 3 }} className="flex items-center"><MapPin className="w-4 h-4 mr-2 text-pink-500" /> <span className="font-medium">Branch Type:</span> {office.BranchType}</motion.p>
                    <motion.p whileHover={{ x: 3 }} className="flex items-center"><Mail className="w-4 h-4 mr-2 text-blue-500" /> <span className="font-medium">Delivery Status:</span> {office.DeliveryStatus}</motion.p>
                    <motion.p whileHover={{ x: 3 }} className="flex items-center"><Building className="w-4 h-4 mr-2 text-green-500" /> <span className="font-medium">District:</span> {office.District}</motion.p>
                    <motion.p whileHover={{ x: 3 }} className="flex items-center"><Globe className="w-4 h-4 mr-2 text-purple-500" /> <span className="font-medium">State:</span> {office.State}</motion.p>
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
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300">Bohurupi Shopping's PIN Code Checker: Your Ultimate Guide</h2>
          <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            Welcome to Bohurupi Shopping's PIN Code Checker! Find accurate pincodes for your postal needs in India quickly and easily.
          </p>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">Why Use Our PINCode Checker?</h3>
          <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
            <li><span className="font-medium">Comprehensive Database:</span> Access a vast database of pincodes and post office details.</li>
            <li><span className="font-medium">User-Friendly Interface:</span> Easy-to-use interface for seamless navigation.</li>
            <li><span className="font-medium">Accurate Results:</span> Ensure accuracy in pincode search results.</li>
            <li><span className="font-medium">Time-Saving:</span> Quick access to postal information.</li>
          </ul>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-teal-600 dark:text-teal-400">How It Works</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300">
            <li>Enter the 6-digit pincode in the search bar above.</li>
            <li>Results will appear automatically as you type.</li>
            <li>Instantly view the corresponding pincode and post office details.</li>
          </ol>
        </motion.div>
      </div>
    </div>
  );
};

export default PincodeDetails;
