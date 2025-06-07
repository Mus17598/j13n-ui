
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
  ];

  return (
    <>
      <motion.nav 
        className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="flex items-center group focus-ring rounded-lg"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mr-3 group-hover:scale-105 transition-transform duration-200"></div>
              <span className="text-xl font-semibold text-gray-900">
                AplyGen
              </span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 focus-ring rounded-md px-3 py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
              <button 
                className="btn-outline"
                onClick={() => navigate('/login')}
              >
                Sign In
              </button>
              
              <button 
                onClick={() => navigate('/signup')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
            
            <div className="md:hidden">
              <button 
                className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus-ring"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {isMobileMenuOpen && (
        <motion.div 
          className="fixed inset-0 z-40 md:hidden glass"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-lg font-medium text-gray-600 hover:text-gray-900 focus-ring rounded-lg px-4 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-6 space-y-4 flex flex-col">
              <button 
                className="btn-secondary"
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
              >
                Sign In
              </button>
              
              <button 
                className="btn-primary"
                onClick={() => {
                  navigate('/signup');
                  setIsMobileMenuOpen(false);
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Navigation;
