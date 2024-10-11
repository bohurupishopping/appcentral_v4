import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, MapPin, Search, Building2, Dumbbell, Info, Calculator, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MobileSidebarProps {
  darkMode: boolean
  toggleDarkMode: () => void
  isOpen: boolean
  toggleSidebar: () => void
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ darkMode, toggleDarkMode, isOpen, toggleSidebar }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 md:hidden"
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={toggleSidebar}></div>
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-4 left-4 bottom-4 w-64 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl shadow-2xl p-6 flex flex-col"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSidebar}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center mb-8"
            >
              <img
                src="https://bohurupi.com/wp-content/uploads/2024/09/Bohurupi-Favicon-2024.webp"
                alt="Bohurupi AppCentral"
                className="w-12 h-12 mr-3 rounded-full shadow-md"
              />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">AppCentral</span>
            </motion.div>

            <nav className="flex-1 overflow-y-auto">
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, staggerChildren: 0.1 }}
                className="space-y-2"
              >
                <NavItem to="/" icon={Home} label="Home" onClick={toggleSidebar} />
                <NavItem to="/pincode-details" icon={MapPin} label="Pincode Details" onClick={toggleSidebar} />
                <NavItem to="/pincode-finder" icon={Search} label="Pincode Finder" onClick={toggleSidebar} />
                <NavItem to="/ifsc-finder" icon={Building2} label="IFSC Finder" onClick={toggleSidebar} />
                <NavItem to="/fitness" icon={Dumbbell} label="Fitness" onClick={toggleSidebar} />
                <NavItem to="/interest-calculator" icon={Calculator} label="Interest Calculator" onClick={toggleSidebar} />
                <NavItem to="/about" icon={Info} label="About" onClick={toggleSidebar} />
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="flex items-center justify-center p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg transition-all duration-200 w-full mb-4"
              >
                {darkMode ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />}
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4"
            >
              App Version - v2.1.0
            </motion.div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface NavItemProps {
  to: string
  icon: React.ElementType
  label: string
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, onClick }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-3 rounded-xl transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md scale-90'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`
        }
        onClick={onClick}
      >
        <Icon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
        <span className="font-medium transition-all duration-300 group-hover:translate-x-1">{label}</span>
      </NavLink>
    </motion.li>
  )
}

export default MobileSidebar
