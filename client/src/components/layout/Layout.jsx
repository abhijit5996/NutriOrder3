import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const Layout = ({ cartItems = [] }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar cartItems={cartItems} />
      
      <Toaster 
        position="top-right" 
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#252A36',
            color: '#FFFFFF',
            border: '1px solid #4A5568',
          },
          success: {
            iconTheme: {
              primary: '#34D399',
              secondary: '#1F2937',
            },
          },
        }}
      />
      
      <motion.main
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="flex-grow"
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;