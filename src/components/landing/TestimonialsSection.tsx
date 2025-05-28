
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    text: "AplyGen helped me land my dream job at a top tech company. The AI-powered applications were spot-on!",
    image: "/placeholder.svg",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Product Manager", 
    text: "The time saved is incredible. What used to take hours now takes minutes with AplyGen.",
    image: "/placeholder.svg",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "UX Designer",
    text: "The personalized cover letters are amazing. Each application feels unique and tailored.",
    image: "/placeholder.svg",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="potion-section bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="potion-container">
        <div className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full text-sm font-medium text-gray-700 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            Testimonials
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What Our Users Say
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                ))}
              </div>
              
              <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
