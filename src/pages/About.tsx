import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-indigo-500/[0.025] bg-[size:20px_20px]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-teal-200 dark:border-teal-700"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-6 bg-gradient-to-r from-teal-400 to-cyan-500 text-white"
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="https://bohurupi.com/wp-content/uploads/2024/10/pritam-img.webp"
            alt="Pritam"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
          />
          <h1 className="text-xl md:text-2xl font-extrabold">About Bohurupi AppCentral</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 p-6 text-gray-700 dark:text-gray-300 text-sm md:text-base"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="leading-relaxed"
          >
            Welcome to Bohurupi AppCentral, your go-to platform for discovering innovative and versatile web apps that simplify tasks and boost productivity. Whether you're looking for tools to enhance your daily life or transform your workflow, Bohurupi AppCentral brings everything under one roof, offering you a seamless and user-friendly experience.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="leading-relaxed"
          >
            At the heart of this platform is Pritam, a passionate web developer and designer with a love for technology that goes back to 2008. With over 15 years of experience in building a wide range of websites and applications—both personal and public—Pritam has honed a deep understanding of web design, functionality, and user experience. Specializing in WordPress development, Pritam has created countless websites, including the official shopping platform for Bohurupi Shopping, known for its unique, custom-designed products.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="leading-relaxed"
          >
            Every app on Bohurupi AppCentral is crafted with dedication, ensuring that you have the best tools at your fingertips. Whether you're here for productivity solutions or a more personalized online experience, you'll find something to love.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl shadow-inner border border-teal-100 dark:border-teal-800"
          >
            <p className="font-semibold text-sm md:text-base text-teal-700 dark:text-teal-300 mb-2">
              For inquiries or collaborations, feel free to reach out to Pritam at:
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:pritam@bohurupi.com"
              className="inline-block text-sm md:text-base font-bold text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors duration-300"
            >
              📧 pritam@bohurupi.com
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
