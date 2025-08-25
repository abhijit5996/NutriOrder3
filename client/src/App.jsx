import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import './index.css';

// Layout
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import RecipePage from './pages/RecipePage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProfilePage from './pages/ProfilePage';
import PreferencesForm from './components/ui/PreferencesForm';

// Context Providers
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route index element={<HomePage />} />
            <Route path="restaurants" element={<RestaurantsPage />} />
            <Route path="restaurants/:id" element={<RestaurantMenuPage />} />
            <Route path="recipe/:id" element={<RecipePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="about" element={<AboutPage />} />
            
            {/* Protected routes */}
            <Route 
              path="cart" 
              element={
                <>
                  <SignedIn>
                    <CartPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="order-success" 
              element={
                <>
                  <SignedIn>
                    <OrderSuccessPage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="profile" 
              element={
                <>
                  <SignedIn>
                    <ProfilePage />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
            <Route 
              path="preferences" 
              element={
                <>
                  <SignedIn>
                    <PreferencesForm 
                      onSubmit={() => window.location.href = '/'}
                      onSkip={() => window.location.href = '/'}
                    />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              } 
            />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;