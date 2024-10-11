import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Building, Globe } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400"
      >
        Pincode Details Checker
      </motion.h1>

      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter PIN code"
            className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-800 dark:text-white"
            maxLength={6}
          />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>

      {pincodeData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pincodeData.PostOffice.map((office: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">{office.Name}</h2>
              <div className="space-y-2">
                <p className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-pink-500" /> <span className="font-semibold">Branch Type:</span> {office.BranchType}</p>
                <p className="flex items-center"><Mail className="w-5 h-5 mr-2 text-blue-500" /> <span className="font-semibold">Delivery Status:</span> {office.DeliveryStatus}</p>
                <p className="flex items-center"><Building className="w-5 h-5 mr-2 text-green-500" /> <span className="font-semibold">District:</span> {office.District}</p>
                <p className="flex items-center"><Globe className="w-5 h-5 mr-2 text-purple-500" /> <span className="font-semibold">State:</span> {office.State}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900 p-4 md:p-6 rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800 dark:text-white">Bohurupi Shopping's PIN Code Checker: Your Ultimate Guide</h2>
        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          Welcome to Bohurupi Shopping's PIN Code Checker! Find accurate pincodes for your postal needs in India quickly and easily.
        </p>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-white">Why Use Our PINCode Checker?</h3>
        <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          <li><strong>Comprehensive Database:</strong> Access a vast database of pincodes and post office details.</li>
          <li><strong>User-Friendly Interface:</strong> Easy-to-use interface for seamless navigation.</li>
          <li><strong>Accurate Results:</strong> Ensure accuracy in pincode search results.</li>
          <li><strong>Time-Saving:</strong> Quick access to postal information.</li>
        </ul>
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-800 dark:text-white">How It Works</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm md:text-base text-gray-700 dark:text-gray-300">
          <li>Enter the 6-digit pincode in the search bar above.</li>
          <li>Results will appear automatically as you type.</li>
          <li>Instantly view the corresponding pincode and post office details.</li>
        </ol>
      </div>
    </div>
  );
};

export default PincodeDetails;