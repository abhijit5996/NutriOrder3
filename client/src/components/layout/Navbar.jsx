import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SignInButton, 
  SignUpButton, 
  UserButton, 
  useUser,
  useClerk
} from '@clerk/clerk-react';

const Navbar = ({ cartItems = [] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Restaurants', path: '/restaurants' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  const handleSignOut = () => {
    signOut();
    setIsProfileDropdownOpen(false);
  };

  const handleManageAccount = () => {
    openUserProfile();
    setIsProfileDropdownOpen(false);
  };
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#0F172A] shadow-xl sticky top-0 z-50 border-b border-[#1E293B] backdrop-blur-sm bg-opacity-95"
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
              {/* ZestyLife Logo */}
              <svg className="w-8 h-8 text-[#38BDF8]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7 12H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 7V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M15.5355 8.46448L8.46447 15.5355" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M15.5355 15.5355L8.46447 8.46447" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#F43F5E] bg-clip-text text-transparent ml-2">
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
                    ? 'text-[#38BDF8] font-medium' 
                    : 'text-[#94A3B8] hover:text-[#38BDF8]'
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#F43F5E]"
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
                className="relative p-1 rounded-md hover:bg-[#1E293B] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-[#38BDF8] to-[#F43F5E] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {cartItems.length}
                  </motion.span>
                )}
              </motion.div>
            </Link>
            
            {isSignedIn ? (
              <div className="flex items-center space-x-3">
                {/* Custom Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#38BDF8] overflow-hidden"
                  >
                    <img 
                      src={user.imageUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                  
                  <AnimatePresence>
                    {isProfileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-[#334155] rounded-md shadow-lg py-1 z-50"
                        onMouseLeave={() => setIsProfileDropdownOpen(false)}
                      >
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        
                        <Link
                          to="/orderhistory"
                          className="block px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Order History
                        </Link>
                        
                        <div className="border-t border-[#334155] my-1"></div>
                        <button
                          onClick={handleManageAccount}
                          className="block w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                        >
                          Manage Account
                        </button>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                        >
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Hidden Clerk UserButton for functionality */}
                <div className="hidden">
                  <UserButton afterSignOutUrl="/" />
                </div>
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
                
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button and Profile Picture */}
          <div className="md:hidden flex items-center">
            {/* Profile Picture for Mobile */}
            {isSignedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#38BDF8] overflow-hidden mr-2"
              >
                <img 
                  src={user.imageUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-[#334155] overflow-hidden mr-2 bg-[#1E293B]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.button>
            )}
            
            {/* Mobile Menu Button */}
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#94A3B8] focus:outline-none p-1 rounded-md hover:bg-[#1E293B] transition-colors"
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
            
            {/* Mobile Profile Dropdown */}
            <AnimatePresence>
              {isProfileDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-[#1E293B] border border-[#334155] rounded-md shadow-lg py-1 z-50 md:hidden"
                >
                  {isSignedIn ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      
                      <Link
                        to="/orderhistory"
                        className="block px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Order History
                      </Link>
                      
                      <div className="border-t border-[#334155] my-1"></div>
                      <button
                        onClick={handleManageAccount}
                        className="block w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                      >
                        Manage Account
                      </button>
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <SignInButton mode="modal">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#334155] hover:text-white"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          Login
                        </button>
                      </SignInButton>
                     
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
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
              className="md:hidden mt-3 overflow-hidden bg-[#1E293B] rounded-lg border border-[#334155]"
            >
              <div className="flex flex-col space-y-1 py-3">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path}
                    className={`px-4 py-2.5 transition-colors duration-200 ${
                      isActive(item.path) 
                        ? 'text-[#38BDF8] bg-[#0F172A] font-medium' 
                        : 'text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#0F172A]'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {isSignedIn && (
                  <>
                    <Link 
                      to="/profile"
                      className="px-4 py-2.5 text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#0F172A] transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      to="/orderhistory"
                      className="px-4 py-2.5 text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#0F172A] transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Order History
                    </Link>
                    <button
                      onClick={handleManageAccount}
                      className="px-4 py-2.5 text-left text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#0F172A] transition-colors duration-200"
                    >
                      Manage Account
                    </button>
                  </>
                )}
                
                <div className="flex items-center justify-between px-4 pt-3 pb-2 border-t border-[#334155] mt-2">
                  <Link to="/cart" className="relative p-2" onClick={() => setIsMenuOpen(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-[#38BDF8] to-[#F43F5E] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                  
                  {isSignedIn ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSignOut}
                        className="btn btn-outline text-sm px-3 py-1.5"
                      >
                        Sign Out
                      </button>
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