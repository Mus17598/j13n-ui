
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function LandingHeader() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 transition-all duration-300 ${
        scrolled ? 'py-2 bg-white/90 backdrop-blur-md shadow-sm' : 'py-6 bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.span 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-green to-primary-green/80"
            whileHover={{ scale: 1.05 }}
          >
            AutoApply
          </motion.span>
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              className="hidden md:flex text-gray-600 hover:text-gray-900"
              onClick={() => navigate('/login')}
            >
              Log in
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              className="bg-primary-green hover:bg-primary-green/90 text-white px-6 py-2 rounded-full"
              onClick={() => navigate('/signup')}
            >
              Sign up free
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <motion.a 
    href={href}
    className="text-gray-600 hover:text-gray-900 relative group"
    whileHover={{ y: -2 }}
  >
    {children}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-green group-hover:w-full transition-all duration-300"></span>
  </motion.a>
);
