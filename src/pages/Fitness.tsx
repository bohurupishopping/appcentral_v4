import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Exercise {
  Exercise: string;
  Image: string;
  Instructions: string;
  Sets: string;
  RepsRange: string;
  Day: string;
}

const Fitness: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedDay, setSelectedDay] = useState('all');

  useEffect(() => {
    fetchExercises();
  }, []);

  const fetchExercises = async () => {
    try {
      const response = await fetch('https://sheetdb.io/api/v1/3z759ihl8tvli');
      const data = await response.json();
      setExercises(data);
      setFilteredExercises(data);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const filterByDay = (day: string) => {
    setSelectedDay(day);
    if (day === 'all') {
      setFilteredExercises(exercises);
    } else {
      setFilteredExercises(exercises.filter(exercise => exercise.Day === day));
    }
    setCurrentIndex(0);
  };

  const getNextExercise = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredExercises.length);
  };

  const getPreviousExercise = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + filteredExercises.length) % filteredExercises.length);
  };

  const currentExercise = filteredExercises[currentIndex];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-sky-100 to-emerald-200 p-4 sm:p-6 md:p-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <motion.select
          value={selectedDay}
          onChange={(e) => filterByDay(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl border-2 border-purple-300 bg-white text-gray-800 font-semibold text-sm shadow-md cursor-pointer transition-all duration-300 hover:border-purple-400 focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <option value="all">All Days</option>
          <option value="Back">Back</option>
          <option value="Chest">Chest</option>
          <option value="Leg">Leg</option>
          <option value="Biceps">Biceps</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Abs">Abs</option>
        </motion.select>

        <AnimatePresence mode="wait">
  {currentExercise && (
    <motion.div
      key={currentExercise.Exercise}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="text-center bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
        <motion.img
          src={currentExercise.Image}
          alt={currentExercise.Exercise}
          className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-md mb-4 md:mb-0"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <div className="md:w-1/2 text-left">
          <h2 className="text-2xl font-bold mb-3 text-indigo-800">{currentExercise.Exercise}</h2>
          <p className="text-gray-700 text-sm mb-4">{currentExercise.Instructions}</p>
        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>


        <div className="flex justify-between mt-6">
          <motion.button
            onClick={getPreviousExercise}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center text-sm font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </motion.button>
          <motion.button
            onClick={getNextExercise}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center text-sm font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Fitness;
