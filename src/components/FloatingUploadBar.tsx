
import React, { useRef, useState } from 'react';
import { FileText, BookOpen, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDocumentsStore } from '@/stores/useDocumentsStore';
import { motion } from 'framer-motion';

const FloatingUploadBar: React.FC = () => {
  const { resume, coverLetter, isUploading, uploadDocument, removeDocument } = useDocumentsStore();
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const coverLetterInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await uploadDocument(type, files[0]);
    }
    // Reset the file input
    e.target.value = '';
  };
  
  const handleRemove = (type: 'resume' | 'coverLetter') => {
    removeDocument(type);
  };

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:w-auto w-[calc(100%-32px)]"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className="bg-white rounded-full shadow-lg px-6 py-3 flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 relative"
                  onClick={() => resumeInputRef.current?.click()}
                  disabled={isUploading === 'resume'}
                  aria-label="Upload resume"
                >
                  <FileText size={24} className={resume ? 'text-primary-green' : 'text-gray-500'} />
                  {resume && (
                    <div className="absolute -top-1 -right-1 bg-primary-green rounded-full w-5 h-5 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </Button>
                {resume && (
                  <button
                    onClick={() => handleRemove('resume')}
                    className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                    aria-label="Remove resume"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="bg-white p-2 shadow-md rounded-md">
              <div className="text-sm">
                {resume 
                  ? `${resume.fileName} - Replace?` 
                  : "Upload resume (PDF, DOCX)"}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-12 h-12 rounded-full bg-gray-50 hover:bg-gray-100 relative"
                  onClick={() => coverLetterInputRef.current?.click()}
                  disabled={isUploading === 'coverLetter'}
                  aria-label="Upload cover letter"
                >
                  <BookOpen size={24} className={coverLetter ? 'text-primary-green' : 'text-gray-500'} />
                  {coverLetter && (
                    <div className="absolute -top-1 -right-1 bg-primary-green rounded-full w-5 h-5 flex items-center justify-center">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </Button>
                {coverLetter && (
                  <button
                    onClick={() => handleRemove('coverLetter')}
                    className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                    aria-label="Remove cover letter"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="bg-white p-2 shadow-md rounded-md">
              <div className="text-sm">
                {coverLetter 
                  ? `${coverLetter.fileName} - Replace?` 
                  : "Upload cover letter (PDF, DOCX)"}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={resumeInputRef}
        className="hidden"
        accept=".pdf,.docx"
        onChange={(e) => handleFileChange(e, 'resume')}
      />
      <input
        type="file"
        ref={coverLetterInputRef}
        className="hidden"
        accept=".pdf,.docx"
        onChange={(e) => handleFileChange(e, 'coverLetter')}
      />
    </motion.div>
  );
};

export default FloatingUploadBar;
