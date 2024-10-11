import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Building2, Dumbbell, Info } from 'lucide-react'

interface MobileNavigationProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <>
      <header className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md p-2 flex justify-center items-center">
        <img
          src="https://bohurupi.com/wp-content/uploads/2023/03/logo-update-bohurupi_1.svg"
          alt="Bohurupi AppCentral"
          className="h-10 w-auto"
        />
      </header>
      <nav className="md:hidden fixed bottom-4 left-4 right-4">
        <div className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2">
          <ul className="flex justify-around items-center">
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/ifsc-finder" icon={Building2} label="IFSC" />
            <NavItem to="/fitness" icon={Dumbbell} label="Fitness" />
            <NavItem to="/about" icon={Info} label="About" />
          </ul>
        </div>
      </nav>
    </>
  )
}

interface NavItemProps {
  to: string
  icon: React.ElementType
  label: string
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-full transition-all duration-300 ${
            isActive
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 scale-110'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110'
          }`
        }
      >
        <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
        <span className="text-[10px] mt-1 transition-all duration-300 group-hover:font-bold">{label}</span>
      </NavLink>
    </li>
  )
}

export default MobileNavigation