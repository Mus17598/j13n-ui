
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" }
  ];
  
  const productLinks = ["Features", "Pricing", "How it works", "FAQ"];
  const companyLinks = ["About", "Blog", "Careers", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="relative border-t border-white/20 bg-gradient-to-b from-slate-50/50 to-purple-50/30 backdrop-blur-sm">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="potion-blur-orb"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${20 + i * 30}%`,
              top: `${-10 + i * 5}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <motion.div 
              className="flex items-center space-x-3 mb-8"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-3xl font-display font-bold gradient-text">AplyGen</span>
            </motion.div>
            <p className="text-slate-600 max-w-md text-lg leading-relaxed mb-10">
              Revolutionizing the job search process with automated applications across multiple platforms.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className="w-14 h-14 rounded-2xl glassmorphism flex items-center justify-center text-slate-600 hover:text-purple-600 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-500"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-slate-800 mb-8 text-lg">Product</h4>
            <ul className="space-y-4">
              {productLinks.map((item, i) => (
                <motion.li key={i} whileHover={{ x: 4 }}>
                  <a href="#" className="text-slate-600 hover:text-purple-600 transition-colors duration-300 text-base font-medium">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-bold text-slate-800 mb-8 text-lg">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((item, i) => (
                <motion.li key={i} whileHover={{ x: 4 }}>
                  <a href="#" className="text-slate-600 hover:text-purple-600 transition-colors duration-300 text-base font-medium">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-12 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-500 text-base">
              © {currentYear} AplyGen. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-6 md:mt-0">
              {legalLinks.map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-base text-slate-500 hover:text-purple-600 transition-colors duration-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
