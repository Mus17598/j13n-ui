
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const AIChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{type: 'user' | 'ai', text: string}>>([
    {type: 'ai', text: 'Hello! I\'m your AI assistant. How can I help with your job applications today?'}
  ]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, {type: 'user', text: message}]);
    
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      if (message.toLowerCase().includes('resume')) {
        response = 'I can help you optimize your resume for specific job applications. Would you like me to review your current resume?';
      } else if (message.toLowerCase().includes('cover')) {
        response = 'Cover letters should be tailored to each job. I can help you craft personalized cover letters based on the job description.';
      } else if (message.toLowerCase().includes('interview')) {
        response = 'To prepare for interviews, I recommend researching the company, practicing common questions, and preparing thoughtful questions to ask.';
      } else {
        response = 'I\'m here to help with your job search. You can ask me about optimizing resumes, writing cover letters, or interview preparation.';
      }
      
      setChatHistory(prev => [...prev, {type: 'ai', text: response}]);
    }, 1000);
    
    setMessage('');
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="frosted-panel w-80 md:w-96 mb-4 overflow-hidden rounded-2xl shadow-xl animate-fade-in">
          <div className="bg-primary-green/90 text-white p-3 flex justify-between items-center">
            <div className="font-medium">Job Search Assistant</div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto bg-white/60 space-y-4">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.type === 'user' 
                      ? 'bg-primary-green text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white/90">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green/50"
              />
              <Button type="submit" size="icon" className="rounded-full bg-primary-green hover:bg-primary-green/90">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </form>
        </div>
      )}
      
      <Button
        onClick={toggleChat}
        size="icon"
        className={`rounded-full w-14 h-14 shadow-lg bg-primary-green hover:bg-primary-green/90 transition-all ${isOpen ? 'scale-95' : 'animate-bounce-soft'}`}
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default AIChatBubble;
