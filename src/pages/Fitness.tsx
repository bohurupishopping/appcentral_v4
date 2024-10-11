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
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-4">
        <select
          value={selectedDay}
          onChange={(e) => filterByDay(e.target.value)}
          className="w-full mb-3 p-2 rounded-lg border border-gray-300 bg-white text-gray-800 font-semibold text-sm shadow-sm"
        >
          <option value="all">All Days</option>
          <option value="Back">Back</option>
          <option value="Chest">Chest</option>
          <option value="Leg">Leg</option>
          <option value="Biceps">Biceps</option>
          <option value="Shoulder">Shoulder</option>
          <option value="Abs">Abs</option>
        </select>

        <AnimatePresence mode="wait">
          {currentExercise && (
            <motion.div
              key={currentExercise.Exercise}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="flex flex-col md:flex-row md:items-start md:space-x-4">
                <img
                  src={currentExercise.Image}
                  alt={currentExercise.Exercise}
                  className="w-full md:w-1/1 h-64 md:h-64 object-cover rounded-lg shadow-md mb-4"
                />
                <div className="md:w-1/1">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">{currentExercise.Exercise}</h2>
                  <p className="text-gray-600 text-[12px] mb-3">{currentExercise.Instructions}</p>
                  <div className="bg-gray-100 p-3 rounded-lg text-sm">
                    <p className="text-gray-800"><strong>Sets:</strong> {currentExercise.Sets}</p>
                    <p className="text-gray-800"><strong>Reps Range:</strong> {currentExercise.RepsRange}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-4">
          <button
            onClick={getPreviousExercise}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-colors duration-200 flex items-center text-sm"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          <button
            onClick={getNextExercise}
            className="bg-purple-500 text-white py-2 px-4 rounded-lg shadow hover:bg-purple-600 transition-colors duration-200 flex items-center text-sm"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fitness;