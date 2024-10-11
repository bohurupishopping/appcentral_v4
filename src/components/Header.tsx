import React, { useState } from 'react'
import { Search, User, Menu } from 'lucide-react'

interface HeaderProps {
  toggleSidebar: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen)

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSignedIn(true)
    setIsUserMenuOpen(false)
  }

  const handleSignOut = () => {
    setIsSignedIn(false)
    setIsUserMenuOpen(false)
  }

  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md p-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 text-white md:hidden">
            <Menu className="w-8 h-8" />
          </button>
          <img
            src="https://bohurupi.com/wp-content/uploads/2023/03/logo-update-bohurupi_1.svg"
            alt="Bohurupi AppCentral"
            className="h-13 md:h-13 w-auto"
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleSearch}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <Search className="w-6 h-6" />
            </button>
            {isSearchOpen && (
              <div className="absolute right-0 top-full mt-2 w-64">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <User className="w-6 h-6" />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {isSignedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                ) : (
                  <form onSubmit={handleSignIn} className="p-4">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full mb-2 px-3 py-2 border rounded-md"
                      required
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full mb-2 px-3 py-2 border rounded-md"
                      required
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Sign In
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header