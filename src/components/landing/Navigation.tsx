
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
    { name: "About", href: "#" },
    { name: "Features", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <>
      <motion.nav 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-2xl border-b border-white/20 shadow-lg shadow-purple-100/20' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <motion.span 
                className="text-2xl font-display font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                AplyGen
              </motion.span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Button 
                    variant="ghost" 
                    className="text-slate-600 hover:text-purple-600 bg-transparent font-medium text-[15px] px-4 py-2 rounded-full hover:bg-purple-50/50 transition-all duration-300"
                  >
                    {link.name}
                  </Button>
                  <motion.div 
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full group-hover:left-0 transition-all duration-500"
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  variant="ghost"
                  className="text-slate-600 hover:text-purple-600 bg-transparent font-medium text-[15px] px-6 py-2 rounded-full hover:bg-purple-50/50 transition-all duration-300"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  onClick={() => navigate('/signup')}
                  className="potion-pill text-[15px] px-8 py-3"
                >
                  Get Started
                </button>
              </motion.div>
            </div>
            
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                className="text-slate-600 bg-transparent p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden bg-white/95 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="text-2xl font-medium text-slate-600 hover:text-purple-600 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                className="pt-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                <button 
                  className="potion-pill-outline text-lg px-8 py-3 block"
                  onClick={() => {
                    navigate('/login');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
                
                <button 
                  className="potion-pill text-lg px-8 py-3 block"
                  onClick={() => {
                    navigate('/signup');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
