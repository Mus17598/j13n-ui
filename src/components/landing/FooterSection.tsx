
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Github } from 'lucide-react';

const FooterSection: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const productLinks = ["Features", "Pricing", "How it works", "FAQ"];
  const companyLinks = ["About", "Blog", "Careers", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="sendpotion-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-xl font-semibold text-gray-900">AplyGen</span>
            </div>
            <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
              Revolutionizing the job search process with automated applications across multiple platforms.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all duration-200">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {currentYear} AplyGen. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {legalLinks.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
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
