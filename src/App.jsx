import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import Questions from './components/Questions'
import Personality from './components/Personality'
import { ScrollTrigger , SplitText } from 'gsap/all';
import gsap from 'gsap'
import Footer from './components/Footer'
import LoginPage from './components/LoginPage'
import PrivateRoute from './components/PrivateRoute';
import AuthLanding from './components/AuthLanding';
import SignupPage from './components/SignupPage';
import ScrollToTop from './components/ScrollToTop';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';

gsap.registerPlugin(ScrollTrigger,SplitText);

const App = () => {
  const location = useLocation();
  const hideNavbar = ['/personality', '/login'].includes(location.pathname);

  useEffect(() => {
    const handleUnload = () => {
      localStorage.clear();
      sessionStorage.clear();
      signOut(auth);
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  return (
    <div className='w-[100vw] h-[100vh] overflow-x-hidden'>
      <ScrollToTop />
      {!hideNavbar && <Navbar />}
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/personality" element={<Personality />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/questions"
        element={
          <PrivateRoute>
            <Questions />
          </PrivateRoute>
        }
      />
      <Route path="/auth" element={<AuthLanding />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
      <Footer />
    </div>
  )
}

export default App