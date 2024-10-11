import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-teal-600 dark:text-teal-400"
      >
        IFSC Details Finder
      </motion.h1>

      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            placeholder="Enter IFSC Code"
            className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-600 dark:bg-gray-800 dark:text-white"
            maxLength={11}
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {bankData && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900 dark:to-cyan-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400">{bankData.BANK}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="flex items-center"><Building className="w-5 h-5 mr-2 text-teal-500" /> <span className="font-semibold">Branch:</span> {bankData.BRANCH}</p>
            <p className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-pink-500" /> <span className="font-semibold">City:</span> {bankData.CITY}</p>
            <p className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-purple-500" /> <span className="font-semibold">State:</span> {bankData.STATE}</p>
            <p className="flex items-center"><Phone className="w-5 h-5 mr-2 text-blue-500" /> <span className="font-semibold">Contact:</span> {bankData.CONTACT}</p>
            <p className="flex items-center"><CreditCard className="w-5 h-5 mr-2 text-green-500" /> <span className="font-semibold">MICR:</span> {bankData.MICR}</p>
            <p className="flex items-center"><Search className="w-5 h-5 mr-2 text-yellow-500" /> <span className="font-semibold">IFSC:</span> {bankData.IFSC}</p>
          </div>
          <p className="mt-4"><span className="font-semibold">Address:</span> {bankData.ADDRESS}</p>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            <p><span className="font-semibold">IMPS:</span> {bankData.IMPS ? 'Available' : 'Not Available'}</p>
            <p><span className="font-semibold">RTGS:</span> {bankData.RTGS ? 'Available' : 'Not Available'}</p>
            <p><span className="font-semibold">NEFT:</span> {bankData.NEFT ? 'Available' : 'Not Available'}</p>
            <p><span className="font-semibold">UPI:</span> {bankData.UPI ? 'Available' : 'Not Available'}</p>
          </div>
        </motion.div>
      )}

      <div className="mt-8 bg-gradient-to-r from-teal-100 via-cyan-100 to-blue-100 dark:from-teal-900 dark:via-cyan-900 dark:to-blue-900 p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-white">Bohurupi Shopping's IFSC Checker: Your Ultimate Guide</h2>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          Welcome to Bohurupi Shopping's IFSC Checker! Find accurate IFSC codes and bank details for all banks in India quickly and easily.
        </p>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-white">Why Use Our IFSC Checker?</h3>
        <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          <li><strong>Comprehensive Database:</strong> Access a vast database of IFSC codes and bank details.</li>
          <li><strong>User-Friendly Interface:</strong> Easy-to-use interface for seamless navigation.</li>
          <li><strong>Accurate Results:</strong> Ensure accuracy in IFSC code search results.</li>
          <li><strong>Time-Saving:</strong> Quick access to bank information.</li>
        </ul>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-white">How It Works</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300">
          <li>Enter the 11-character IFSC code in the search bar above.</li>
          <li>Results will appear automatically as you type.</li>
          <li>Instantly view the corresponding bank and branch details.</li>
        </ol>
      </div>
    </div>
  );
};

export default IFSCFinder;