
import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Twitter, Linkedin, Facebook, Mail } from "lucide-react";

export function LandingFooter() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Security", href: "#" },
        { name: "FAQ", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#" },
        { name: "Documentation", href: "#" },
        { name: "Guides", href: "#" },
        { name: "API Reference", href: "#" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact", href: "#" },
        { name: "Privacy", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Facebook, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Mail, href: "#" }
  ];
  
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" className="flex items-center mb-6">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-green to-primary-green/80">
                AutoApply
              </span>
            </Link>
            <p className="text-gray-600 mb-6">
              Revolutionizing the job search process with AI-powered automation.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((section, i) => (
            <div key={i} className="col-span-1">
              <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <motion.li key={j} whileHover={{ x: 2 }}>
                    <a 
                      href={link.href} 
                      className="text-gray-600 hover:text-primary-green transition-colors"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} AutoApply. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Terms", "Privacy", "Cookies"].map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-sm text-gray-600 hover:text-primary-green transition-colors"
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
}
