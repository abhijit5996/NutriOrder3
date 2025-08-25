import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SignInButton, 
  SignUpButton, 
  UserButton, 
  useUser 
} from '@clerk/clerk-react';

const Navbar = ({ cartItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn } = useUser();
  
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1A1D25] shadow-lg sticky top-0 z-50 border-b border-gray-800"
    >
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* NutriOrder Logo */}
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M15.5355 8.46448L8.46447 15.5355" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M15.5355 15.5355L8.46447 8.46447" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent ml-2">
                ZestyLife
              </span>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link 
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 transition-all duration-300 ${
                  isActive(item.path) 
                    ? 'text-primary font-medium' 
                    : 'text-gray-300 hover:text-primary'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    layoutId="navbar-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </Link>
            ))}
          </div>
          
          {/* Cart and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/cart" className="relative p-2">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
                className="relative p-1 rounded-md hover:bg-gray-800 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </motion.div>
            </Link>
            
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                {/* Clerk User Button */}
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 border-2 border-primary",
                    }
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <SignInButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline text-sm px-4 py-1.5"
                  >
                    Login
                  </motion.button>
                </SignInButton>
                {/* <SignUpButton mode="modal">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary text-sm px-4 py-1.5"
                  >
                    Sign Up
                  </motion.button>
                </SignUpButton> */}
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 focus:outline-none p-1 rounded-md hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-3 overflow-hidden bg-gray-800 rounded-lg"
            >
              <div className="flex flex-col space-y-1 py-3">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2.5 transition-colors duration-200 ${
                      isActive(item.path) 
                        ? 'text-primary bg-gray-900 font-medium' 
                        : 'text-gray-300 hover:text-primary hover:bg-gray-700'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center justify-between px-4 pt-3 pb-2 border-t border-gray-700 mt-2">
                  <Link to="/cart" className="relative p-2" onClick={() => setIsMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                  
                  {isSignedIn ? (
                    <div className="flex items-center space-x-2">
                      <UserButton 
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8 border-2 border-primary",
                          }
                        }}
                        afterSignOutUrl="/"
                      />
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <SignInButton mode="modal">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-outline text-sm px-3 py-1.5"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Login
                        </motion.button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn btn-primary text-sm px-3 py-1.5"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign Up
                        </motion.button>
                      </SignUpButton>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;