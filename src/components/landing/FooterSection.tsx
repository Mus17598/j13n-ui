
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const productLinks = ["Features", "Pricing", "How it works", "FAQ"];
  const companyLinks = ["About", "Blog", "Careers", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="potion-container py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mr-3"></div>
              <span className="text-xl font-semibold text-gray-900">AplyGen</span>
            </div>
            <p className="text-gray-600 max-w-md mb-8 leading-relaxed text-lg">
              Revolutionizing the job search process with automated applications across multiple platforms.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github, href: "#" },
                { icon: Mail, href: "#" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 hover:scale-105"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 text-lg">Product</h4>
            <ul className="space-y-4">
              {productLinks.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-6 text-lg">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © {currentYear} AplyGen. All rights reserved.
            </p>
            <div className="flex space-x-8">
              {legalLinks.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
