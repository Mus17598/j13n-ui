import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Rocket, Brain, Clock, Shield, Search, Filter, Send, Twitter, Linkedin, Github, MessageCircle, User, Upload, Zap, BarChart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import AutoApplyFAB from '@/components/AutoApplyFAB';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  
  // Smooth scroll setup
  const { scrollYProgress } = useScroll();
  const scaleProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects for different sections
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const benefitsY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Interactive background animation
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.01,
        y: (e.clientY - window.innerHeight / 2) * 0.01
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAutoApplyClick = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Enhanced with smooth transitions */}
      <motion.nav 
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <motion.span 
                className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-green to-primary-green/80"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                AutoApply
              </motion.span>
            </Link>
            <div className="flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  About
                </Button>
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-green group-hover:w-full transition-all duration-300"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </Button>
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-green group-hover:w-full transition-all duration-300"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  className="border-gray-200 hover:border-primary-green/50 transition-all duration-300"
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section - Enhanced with parallax and interactive background */}
      <motion.section 
        className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center"
        style={{ y: heroY }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent"
          style={{
            x: mousePosition.x,
            y: mousePosition.y,
          }}
        />
        <div className="max-w-7xl mx-auto relative w-full">
          <div className="text-center space-y-8">
            <motion.h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight cursor-default"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AutoApply
              <span className="block text-4xl md:text-5xl lg:text-6xl mt-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-green to-primary-green/80">
                Your personal job-seeking engine
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Harness AI to search, filter, and apply for jobs that match you best — all on autopilot.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="text-lg px-10 py-7 bg-primary-green hover:bg-primary-green/90 transition-all duration-300 shadow-lg hover:shadow-xl rounded-full"
                  onClick={handleAutoApplyClick}
                >
                  Try it Free
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Benefits */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 cursor-default bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            Why Users Love It
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Saves 10+ hours/week", desc: "Focus on what matters while AutoApply handles the rest." },
              { icon: CheckCircle2, title: "Personalized applications", desc: "Every application is tailored to match the job requirements." },
              { icon: Brain, title: "Learns from you", desc: "Gets smarter with every application you approve or reject." },
              { icon: Rocket, title: "Real-time tracking", desc: "Monitor your applications status in real-time." },
              { icon: Shield, title: "Private & secure", desc: "Your data is encrypted and never shared without permission." },
              { icon: MessageCircle, title: "24/7 Support", desc: "Got questions? We've got answers. Our support team makes it super easy to get your problems solved — fast." }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    x: mousePosition.x * 2,
                    y: mousePosition.y * 2,
                  }}
                />
                <div className="relative z-10">
                  <motion.div 
                    className="w-14 h-14 bg-primary-green/10 rounded-2xl flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <benefit.icon className="w-7 h-7 text-primary-green" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-green transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Section - Enhanced with interactive process visualization */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(var(--primary-green-rgb),0.1),transparent)]"
          style={{
            x: mousePosition.x * 3,
            y: mousePosition.y * 3,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-bold mb-8 cursor-default bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
                whileHover={{ scale: 1.02 }}
              >
                Smarter than your average job board.
              </motion.h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Our AI refines your preferences and tailors every application with surgical precision.
              </p>
              <div className="space-y-6">
                {[
                  "Intelligent job matching",
                  "Automated cover letter generation",
                  "Resume keyword optimization"
                ].map((feature, i) => (
                  <motion.div 
                    key={i} 
                    className="flex items-center space-x-4 group cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-primary-green/10 flex items-center justify-center"
                      whileHover={{ scale: 1.2, backgroundColor: "rgba(var(--primary-green-rgb), 0.2)" }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary-green" />
                    </motion.div>
                    <span className="text-lg text-gray-700 group-hover:text-primary-green transition-colors duration-300">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              className="relative aspect-square"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/20 to-primary-green/5 rounded-[40px] transform rotate-6 transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-gradient-to-tl from-primary-green/20 to-transparent rounded-[40px] transform -rotate-6 transition-transform group-hover:-rotate-12" />
              <motion.div 
                className="relative h-full w-full bg-white rounded-[40px] shadow-xl p-8 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center space-y-6">
                  <Brain className="w-16 h-16 text-primary-green mx-auto" />
                  <h3 className="text-2xl font-semibold text-gray-900">AI-Powered</h3>
                  <p className="text-gray-600">Smart matching and automated applications</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Efficiency Section - Replacing "How it works" */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-20 cursor-default bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            Focus on What Matters
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold mb-6 text-gray-900">
                Stop the Application Grind
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Tired of spending hours on repetitive job applications? We get it. That's why we've built a smarter way to job hunt.
              </p>
              <ul className="space-y-6">
                {[
                  "Upload your details once, apply to jobs forever",
                  "One-click applications to your dream companies",
                  "More time to prepare for interviews",
                  "Real-time tracking of your applications"
                ].map((point, i) => (
                  <motion.li 
                    key={i}
                    className="flex items-start space-x-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary-green mt-1 flex-shrink-0" />
                    <span className="text-lg text-gray-700">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-green/10 to-transparent rounded-3xl" />
              <div className="relative p-8 bg-white rounded-3xl shadow-lg">
                <div className="space-y-8">
                  {[
                    { icon: User, title: "Create Account", desc: "Sign up in seconds" },
                    { icon: Upload, title: "Upload Details", desc: "Your info, stored securely" },
                    { icon: Zap, title: "One-Click Apply", desc: "Apply to jobs instantly" },
                    { icon: BarChart, title: "Track Progress", desc: "Monitor your success" }
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center space-x-4 group"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center group-hover:bg-primary-green/20 transition-colors duration-300">
                        <step.icon className="w-6 h-6 text-primary-green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                        <p className="text-gray-600">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 cursor-default"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            Let AutoApply work for you
          </motion.h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who've simplified their job search with AutoApply.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-primary-green hover:bg-primary-green/90 transition-all shadow-lg hover:shadow-xl"
              onClick={handleAutoApplyClick}
            >
              Sign up free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
          <p className="mt-4 text-sm text-gray-500">No credit card needed. Instant start.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(var(--primary-green-rgb),0.1),transparent)]"
          style={{
            x: mousePosition.x * -2,
            y: mousePosition.y * -2,
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 cursor-default bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
            whileHover={{ scale: 1.02 }}
          >
            What Our Users Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer",
                text: "AutoApply helped me land my dream job at a top tech company. The AI-powered applications were spot-on!",
                image: "/avatars/sarah.jpg"
              },
              {
                name: "Michael Chen",
                role: "Product Manager",
                text: "The time saved is incredible. What used to take hours now takes minutes with AutoApply.",
                image: "/avatars/michael.jpg"
              },
              {
                name: "Emily Rodriguez",
                role: "UX Designer",
                text: "The personalized cover letters are amazing. Each application feels unique and tailored.",
                image: "/avatars/emily.jpg"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm group relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px -20px rgba(0,0,0,0.1)"
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    x: mousePosition.x * 2,
                    y: mousePosition.y * 2,
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <motion.div 
                className="flex items-center space-x-2 mb-4"
                whileHover={{ scale: 1.02 }}
              >
                <img src="/logo.svg" alt="AutoApply Logo" className="h-8 w-8" />
                <span className="text-xl font-bold text-gray-900">AutoApply</span>
              </motion.div>
              <p className="text-gray-600 max-w-md">
                Revolutionizing the job search process with AI-powered automation and personalization.
              </p>
              <div className="flex space-x-4 mt-6">
                {[
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Github, href: "#" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-primary-green hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "How it works", "FAQ"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 2 }}>
                    <a href="#" className="text-gray-600 hover:text-primary-green transition-colors duration-300">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item, i) => (
                  <motion.li key={i} whileHover={{ x: 2 }}>
                    <a href="#" className="text-gray-600 hover:text-primary-green transition-colors duration-300">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} AutoApply. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="text-sm text-gray-600 hover:text-primary-green transition-colors duration-300"
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

      {/* REMOVE the floating Start Auto-Apply button */}
      {/* <AutoApplyFAB onClick={handleAutoApplyClick} /> */}
    </div>
  );
};

export default Landing;