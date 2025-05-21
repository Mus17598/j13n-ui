
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import SectionHeading from '@/components/ui/section-heading';

const testimonials = [
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
];

const TestimonialsSection: React.FC = () => {
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

  return (
    <section className="py-24 relative overflow-hidden px-4">
      <motion.div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(116,187,251,0.2),transparent)]"
        style={{
          x: mousePosition.x * -15,
          y: mousePosition.y * -15,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading 
          title="What Our Users Say"
          align="center"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GlassCard 
                hoverEffect 
                className="relative h-full"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-primary-purple/5 to-primary-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    x: mousePosition.x * 10,
                    y: mousePosition.y * 10,
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-4 mb-6">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-white/10 overflow-hidden border border-white/20"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-white/80 italic">"{testimonial.text}"</p>
                
                  <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 8H8V32H20L8 56H20L32 32H20V8Z" fill="currentColor"/>
                      <path d="M52 8H40V32H52L40 56H52L64 32H52V8Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
