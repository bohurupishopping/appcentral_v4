import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, MapPin, Search, Building2, Dumbbell, Info, Calculator, Sun, Moon, ChevronLeft, ChevronRight, X } from 'lucide-react'

interface SidebarProps {
  darkMode: boolean
  toggleDarkMode: () => void
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ darkMode, toggleDarkMode, isOpen, toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <aside className={`fixed inset-y-4 left-4 z-50 ${collapsed ? 'w-20' : 'w-64'} bg-white dark:bg-gray-900 rounded-3xl shadow-lg flex flex-col transition-all duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
      <div className={`flex ${collapsed ? 'flex-col' : 'flex-row'} items-center justify-between p-4 mb-4`}>
        <img
          src="https://app.bohurupi.com/bohurupi_favcon.png"
          alt="Bohurupi AppCentral"
          className={`${collapsed ? 'w-12 h-12' : 'w-10 h-10'} transition-all duration-300`}
        />
        {!collapsed && <span className="text-lg font-semibold text-gray-800 dark:text-white ml-2">AppCentral</span>}
        <button
          onClick={toggleCollapse}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 md:block hidden"
        >
          {collapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
        <button
          onClick={toggleSidebar}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 md:hidden"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-2">
          <NavItem to="/" icon={Home} label="Home" collapsed={collapsed} onClick={toggleSidebar} />
          <NavItem to="/pincode-details" icon={MapPin} label="Pincode Details" collapsed={collapsed} onClick={toggleSidebar} />
          <NavItem to="/pincode-finder" icon={Search} label="Pincode Finder" collapsed={collapsed} onClick={toggleSidebar} />
          <NavItem to="/ifsc-finder" icon={Building2} label="IFSC Finder" collapsed={collapsed} onClick={toggleSidebar} />
          <NavItem to="/fitness" icon={Dumbbell} label="Fitness" collapsed={collapsed} onClick={toggleSidebar} />
          <NavItem to="/interest-calculator" icon={Calculator} label="Interest Calculator" collapsed={collapsed} onClick={toggleSidebar} />
          <NavItem to="/about" icon={Info} label="About" collapsed={collapsed} onClick={toggleSidebar} />
        </ul>
      </nav>

      <div className="mt-auto p-4">
        <button
          onClick={toggleDarkMode}
          className={`flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 w-full ${collapsed ? 'px-2' : 'px-4'}`}
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          {!collapsed && <span className="ml-2 text-sm font-medium">{darkMode ? 'Light' : 'Dark'}</span>}
        </button>
      </div>
      {!collapsed && (
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 mb-4">
          App Version - v2.1.0
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
  onClick?: () => void
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, collapsed, onClick }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-3 rounded-xl transition-all duration-300 ${
            isActive
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md'
          }`
        }
        onClick={onClick}
      >
        <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'} transition-transform duration-300 group-hover:scale-110`} />
        {!collapsed && (
          <span className="font-medium transition-all duration-300 group-hover:translate-x-1">
            {label}
          </span>
        )}
      </NavLink>
    </li>
  )
}

export default Sidebar