import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Search, Building2, Dumbbell, Info, Calculator } from 'lucide-react';

const HomePage: React.FC = () => {
  const pages = [
    {
      title: 'Pincode Details',
      description: 'Find detailed information about any pincode in India.',
      icon: MapPin,
      link: '/pincode-details',
      color: 'from-pink-500 to-rose-500',
      clipart: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f472b6'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E\")"
    },
    {
      title: 'Pincode Finder',
      description: 'Search for pincodes by post office name or location.',
      icon: Search,
      link: '/pincode-finder',
      color: 'from-purple-500 to-indigo-500',
      clipart: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%238b5cf6'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E\")"
    },
    {
      title: 'IFSC Details Finder',
      description: 'Get bank details using IFSC codes quickly and easily.',
      icon: Building2,
      link: '/ifsc-finder',
      color: 'from-green-500 to-teal-500',
      clipart: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981'%3E%3Cpath d='M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z'/%3E%3C/svg%3E\")"
    },
    {
      title: 'Fitness',
      description: 'Explore exercises and workout routines for a healthier you.',
      icon: Dumbbell,
      link: '/fitness',
      color: 'from-yellow-500 to-orange-500',
      clipart: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23f59e0b'%3E%3Cpath d='M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z'/%3E%3C/svg%3E\")"
    },
    {
      title: 'Interest Calculator',
      description: 'Calculate interest for your fixed deposits and loans.',
      icon: Calculator,
      link: '/interest-calculator',
      color: 'from-blue-500 to-cyan-500',
      clipart: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230ea5e9'%3E%3Cpath d='M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'/%3E%3C/svg%3E\")"
    },
    {
      title: 'About',
      description: 'Learn more about Bohurupi AppCentral and its creator.',
      icon: Info,
      link: '/about',
      color: 'from-indigo-500 to-purple-500',
      clipart: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23818cf8'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/%3E%3C/svg%3E\")"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 text-indigo-600 dark:text-indigo-400"
      >
        Welcome to Bohurupi AppCentral
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-base sm:text-lg md:text-xl text-center mb-6 sm:mb-10 text-gray-600 dark:text-gray-300"
      >
        Your one-stop solution for all your information needs
      </motion.p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {pages.map((page, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className={`relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${page.color} opacity-75`}></div>
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-sm"
              style={{ backgroundImage: page.clipart }}
            ></div>
            <div className="relative p-3 sm:p-4 md:p-6 flex flex-col h-full">
              <div className="flex items-center mb-1 sm:mb-2">
                <page.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white mr-1 sm:mr-2" />
                <h2 className="text-sm sm:text-base md:text-lg font-semibold text-white">{page.title}</h2>
              </div>
              <p className="text-white text-opacity-90 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 flex-grow">{page.description}</p>
              <Link
                to={page.link}
                className="inline-flex items-center px-2 py-1 sm:px-3 sm:py-2 bg-white text-gray-800 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors duration-200"
              >
                View
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;