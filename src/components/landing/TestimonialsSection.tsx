
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Tech Startup",
    content: "AplyGen helped me apply to 50+ companies in just one week. I landed 3 interviews and got my dream job!",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "Marketing Manager", 
    company: "Fortune 500",
    content: "The automation is incredible. What used to take me hours now takes minutes. Highly recommended!",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emily Johnson",
    role: "Data Scientist",
    company: "AI Company",
    content: "Finally, a tool that understands the job search struggle. AplyGen made the process so much easier.",
    rating: 5,
    avatar: "EJ"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-heading-lg mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What our users are saying
          </motion.h2>
          <motion.p 
            className="text-body-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join thousands of job seekers who've streamlined their job search with AplyGen.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    className="w-4 h-4 text-yellow-400 fill-current" 
                  />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="w-6 h-6 text-gray-300 mb-2" />
                <p className="text-body">
                  {testimonial.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
