import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <img
          src="https://bohurupi.com/wp-content/uploads/2024/10/pritam-img.webp"
          alt="Pritam"
          className="w-48 h-48 rounded-full mx-auto mb-4 shadow-lg"
        />
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">About Bohurupi AppCentral</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4 text-gray-700 dark:text-gray-300"
      >
        <p>
          Welcome to Bohurupi AppCentral, your go-to platform for discovering innovative and versatile web apps that simplify tasks and boost productivity. Whether you're looking for tools to enhance your daily life or transform your workflow, Bohurupi AppCentral brings everything under one roof, offering you a seamless and user-friendly experience.
        </p>
        <p>
          At the heart of this platform is Pritam, a passionate web developer and designer with a love for technology that goes back to 2008. With over 15 years of experience in building a wide range of websites and applications—both personal and public—Pritam has honed a deep understanding of web design, functionality, and user experience. Specializing in WordPress development, Pritam has created countless websites, including the official shopping platform for Bohurupi Shopping, known for its unique, custom-designed products.
        </p>
        <p>
          Every app on Bohurupi AppCentral is crafted with dedication, ensuring that you have the best tools at your fingertips. Whether you're here for productivity solutions or a more personalized online experience, you'll find something to love.
        </p>
        <p className="font-semibold">
          For inquiries or collaborations, feel free to reach out to Pritam at:
          <br />
          📧 <a href="mailto:pritam@bohurupi.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">pritam@bohurupi.com</a>
        </p>
      </motion.div>
    </div>
  );
};

export default About;