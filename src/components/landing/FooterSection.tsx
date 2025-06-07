
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const productLinks = ["Features", "Pricing", "How it works", "FAQ"];
  const companyLinks = ["About", "Blog", "Careers", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container section">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-8">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg mr-3"></div>
              <span className="text-xl font-semibold text-gray-900">AplyGen</span>
            </div>
            <p className="text-body max-w-md mb-10">
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
                  className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 hover:scale-105 focus-ring"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-8 text-lg">Product</h4>
            <ul className="space-y-4">
              {productLinks.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium focus-ring rounded px-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-8 text-lg">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium focus-ring rounded px-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0 font-medium">
              © {currentYear} AplyGen. All rights reserved.
            </p>
            <div className="flex space-x-8">
              {legalLinks.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-medium focus-ring rounded px-2 py-1"
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
