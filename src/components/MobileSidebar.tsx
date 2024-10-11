import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, MapPin, Search, Building2, Dumbbell, Info, Calculator, X, Sun, Moon } from 'lucide-react'

interface MobileSidebarProps {
  darkMode: boolean
  toggleDarkMode: () => void
  isOpen: boolean
  toggleSidebar: () => void
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ darkMode, toggleDarkMode, isOpen, toggleSidebar }) => {
  return (
    <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleSidebar}></div>
      <aside className={`absolute top-4 left-4 bottom-4 w-64 bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-6 flex flex-col transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <button onClick={toggleSidebar} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center mb-8">
          <img
            src="https://app.bohurupi.com/bohurupi_favcon.png"
            alt="Bohurupi AppCentral"
            className="w-10 h-10 mr-3"
          />
          <span className="text-lg font-semibold text-gray-800 dark:text-white">AppCentral</span>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <NavItem to="/" icon={Home} label="Home" onClick={toggleSidebar} />
            <NavItem to="/pincode-details" icon={MapPin} label="Pincode Details" onClick={toggleSidebar} />
            <NavItem to="/pincode-finder" icon={Search} label="Pincode Finder" onClick={toggleSidebar} />
            <NavItem to="/ifsc-finder" icon={Building2} label="IFSC Finder" onClick={toggleSidebar} />
            <NavItem to="/fitness" icon={Dumbbell} label="Fitness" onClick={toggleSidebar} />
            <NavItem to="/interest-calculator" icon={Calculator} label="Interest Calculator" onClick={toggleSidebar} />
            <NavItem to="/about" icon={Info} label="About" onClick={toggleSidebar} />
          </ul>
        </nav>

        <div className="mt-auto">
          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 w-full mb-2"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-500 mr-2" /> : <Moon className="w-5 h-5 text-indigo-600 mr-2" />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          App Version - v2.1.0
        </div>
      </aside>
    </div>
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
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-xl transition-all duration-300 ${
            isActive
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 scale-105'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
          }`
        }
        onClick={onClick}
      >
        <Icon className="w-5 h-5 mr-3 transition-transform duration-300 group-hover:scale-110" />
        <span className="font-medium transition-all duration-300 group-hover:translate-x-1">{label}</span>
      </NavLink>
    </li>
  )
}

export default MobileSidebar