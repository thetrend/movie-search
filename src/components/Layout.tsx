import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { Link } from 'react-router'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="from-[#cb2203] bg-gradient-to-b to-transparent  text-white px-2 xl:px-0 py-10 pb-20">
        <nav className="container mx-auto flex justify-between items-center px-6 lg:px-0">
          <h1 className="text-xl font-bold">
            <Link to="/">Movie Search</Link>
          </h1>
          <div className="hidden lg:flex">
            <Link to="/" className="mr-8">
              Home
            </Link>
            <Link to="/about" className="mr-8">
              About
            </Link>
            <Link to="/history" className="mr-8">
              Recent Searches
            </Link>
          </div>
          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="lg:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle Mobile Menu"
          >
            <FontAwesomeIcon icon="bars" />
          </button>
        </nav>
      </header>

      {/* Mobile Overlay Menu */}
      <div
        className={`fixed inset-0 bg-[#121315] bg-opacity-90 z-50 transition-all duration-300 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } lg:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Close Mobile Menu"
          >
            <FontAwesomeIcon
              icon="times"
              className="text-white text-2xl mr-2"
            />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <Link
            to="/"
            className="py-4 text-white text-xl hover:bg-gray-700 w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="py-4 text-white text-xl hover:bg-gray-700 w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/history"
            className="py-4 text-white text-xl hover:bg-gray-700 w-full text-center"
            onClick={() => setIsMenuOpen(false)}
          >
            Recent Searches
          </Link>
        </div>
      </div>

      <main className="container mx-auto flex-grow py-6">{children}</main>

      <footer className="bg-[#121315] text-white text-center py-4">
        <p>
          &copy; 2025,{' '}
          <a href="https://graced.is/" target="_blank" rel="noreferrer">
            Grace de la Mora
          </a>
          .
        </p>
      </footer>
    </div>
  )
}

export default Layout
