import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, MapPin, Search, Building2, Dumbbell, Info, Calculator, Sun, Moon, ChevronLeft, ChevronRight } from 'lucide-react'

interface SidebarProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, toggleDarkMode }) => {
  const [collapsed, setCollapsed] = useState(true)

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <aside 
      className={`
        fixed inset-y-4 left-4 z-50 
        ${collapsed ? 'w-20' : 'w-64'} 
        bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 
        rounded-3xl shadow-2xl 
        flex flex-col 
        transition-all duration-300 ease-in-out 
        transform translate-x-0
        hidden md:flex // Hide on mobile, show on md screens and up
      `}
    >
      <div className={`flex ${collapsed ? 'flex-col' : 'flex-row'} items-center justify-between p-4`}>
        <img
          src="https://bohurupi.com/wp-content/uploads/2024/09/Bohurupi-Favicon-2024.webp"
          alt="Bohurupi AppCentral"
          className={`${collapsed ? 'w-12 h-12' : 'w-10 h-10'} transition-all duration-300 rounded-full shadow-md`}
        />
        {!collapsed && (
          <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 ml-2">
            AppCentral
          </span>
        )}
        <button
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 mt-2"
        >
          {collapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="space-y-2">
          <NavItem to="/" icon={Home} label="Home" collapsed={collapsed} />
          <NavItem to="/pincode-details" icon={MapPin} label="Pincode Details" collapsed={collapsed} />
          <NavItem to="/pincode-finder" icon={Search} label="Pincode Finder" collapsed={collapsed} />
          <NavItem to="/ifsc-finder" icon={Building2} label="IFSC Finder" collapsed={collapsed} />
          <NavItem to="/fitness" icon={Dumbbell} label="Fitness" collapsed={collapsed} />
          <NavItem to="/interest-calculator" icon={Calculator} label="Interest Calculator" collapsed={collapsed} />
          <NavItem to="/about" icon={Info} label="About" collapsed={collapsed} />
        </ul>
      </nav>

      <div className="mt-auto p-4">
        <button
          onClick={toggleDarkMode}
          className={`
            flex items-center justify-center p-2 rounded-xl 
            bg-gradient-to-r from-indigo-500 to-purple-500 
            hover:from-indigo-600 hover:to-purple-600 
            text-white shadow-lg transition-all duration-200 
            w-full ${collapsed ? 'aspect-square' : 'px-4 py-2'}
          `}
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          {!collapsed && <span className="ml-2 text-sm font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
      {!collapsed && (
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2 mb-4">
          v2.1.0
        </div>
      )}
    </aside>
  )
}

interface NavItemProps {
  to: string
  icon: React.ElementType
  label: string
  collapsed: boolean
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, collapsed }) => {
  return (
    <li className="transition-all duration-200 ease-in-out">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center justify-center sm:justify-start p-2 rounded-xl transition-all duration-300 ${
            isActive
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md'
          }`
        }
      >
        <Icon className={`w-6 h-6 ${collapsed ? '' : 'mr-3'} transition-transform duration-300 group-hover:scale-110`} />
        {!collapsed && (
          <span className="text-sm font-medium transition-all duration-300 group-hover:translate-x-1">
            {label}
          </span>
        )}
      </NavLink>
    </li>
  )
}

export default Sidebar
