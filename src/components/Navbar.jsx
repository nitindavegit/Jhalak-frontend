import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import { ArrowBigRight, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authState = localStorage.getItem('isAuthenticated') === 'true';
      setIsAuthenticated(authState);
      setUserEmail(localStorage.getItem('userEmail') || '');
      setUserName(localStorage.getItem('userName') || '');
      setUserPhoto(localStorage.getItem('userPhoto') || null);
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    setIsAuthenticated(false);
    setUserEmail('');
    setUserName('');
    setUserPhoto(null);
    navigate('/');
  };

  const handleClick = () => {
    navigate('/auth');
  };

  return (
    <div className='w-full h-30 rounded-b-4xl border-b border-neutral-700  shadow-md flex items-center px-4 justify-between'>
      <NavLink to="/">
        <img src={logo} alt="Logo"  className=" cursor-pointer h-[50px]  w-[50px] ml-[2rem] scale-200 " />
      </NavLink>
      <div className='flex space-x-[0.5rem]'>
      {isAuthenticated ? (
        <div className="flex items-center gap-4 mr-8">
          <div className="relative group flex items-center">
            <img
              src={userPhoto || logo}
              alt="User Avatar"
              className="h-10 w-10 rounded-full border-2 border-blue-400 object-cover transition-transform duration-200 group-hover:scale-110 group-hover:border-blue-600 cursor-pointer"
            />
            <span className="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-neutral-800 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap">
              {userName || userEmail}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="items-center flex gap-1 bg-neutral-800 text-white px-3 py-2 rounded-lg hover:bg-red-600 hover:scale-105 transition-all duration-200"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleClick}
            className='flex gap-2 md:hidden self-center cursor-pointer bg-[#f5f5dc]  text-black font-semibold raleway pl-3 py-3 pr-5 rounded-2xl hover:bg-amber-200 hover:scale-110 transition-all duration-500'
          >
            Get Started
            <ArrowBigRight />
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="bg-blue-600 hidden md:block text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-200 mr-8"
          >
            Sign In
          </button>
        </>
      )}
      </div>
    </div>
  );
};

export default Navbar;