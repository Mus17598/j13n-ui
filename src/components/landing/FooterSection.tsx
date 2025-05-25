
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
    <footer className="border-t border-green-200 bg-gray-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-xl font-display font-bold gradient-text">AutoApply</span>
            </motion.div>
            <p className="text-gray-600 max-w-md">
              Revolutionizing the job search process with AI-powered automation and personalization.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-green-500 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-2">
              {productLinks.map((item, i) => (
                <motion.li key={i} whileHover={{ x: 2 }}>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((item, i) => (
                <motion.li key={i} whileHover={{ x: 2 }}>
                  <a href="#" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-green-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} AutoApply. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((item, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="text-sm text-gray-500 hover:text-green-600 transition-colors duration-300"
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
