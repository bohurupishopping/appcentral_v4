import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './components/Sidebar'
import MobileSidebar from './components/MobileSidebar'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import HomePage from './pages/HomePage'
import PincodeDetails from './pages/PincodeDetails'
import PincodeFinder from './pages/PincodeFinder'
import IFSCFinder from './pages/IFSCFinder'
import Fitness from './pages/Fitness'
import About from './pages/About'
import InterestCalculator from './pages/InterestCalculator'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
        <div className="flex flex-1">
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main className="flex-1 p-4 md:p-6 transition-colors duration-200 overflow-y-auto pt-16 md:pt-4">
            <button onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
              <Menu className="w-6 h-6" />
            </button>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pincode-details" element={<PincodeDetails />} />
              <Route path="/pincode-finder" element={<PincodeFinder />} />
              <Route path="/ifsc-finder" element={<IFSCFinder />} />
              <Route path="/fitness" element={<Fitness />} />
              <Route path="/interest-calculator" element={<InterestCalculator />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
        <MobileSidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <MobileNavigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Footer />
      </div>
    </Router>
  )
}

export default App