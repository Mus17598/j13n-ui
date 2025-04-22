
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, X } from "lucide-react";
import { motion } from "framer-motion";

interface FileItem {
  id: string;
  name: string;
  type: 'resume' | 'coverLetter';
  preview?: string;
}

const ResumeUpload: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [dragActive, setDragActive] = useState<'resume' | 'coverLetter' | null>(null);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'resume' | 'coverLetter') => {
    e.preventDefault();
    setDragActive(null);
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    if (droppedFiles.length > 0) {
      const newFile = droppedFiles[0];
      
      // For PDF files, we'd just show a generic icon, but for demo we'll pretend all files are PDFs
      const newFileItem: FileItem = {
        id: Math.random().toString(36).substring(2),
        name: newFile.name,
        type: type,
        preview: type === 'resume' ? '/placeholder.svg' : '/placeholder.svg'
      };
      
      // Remove any existing file of the same type
      const filteredFiles = files.filter(file => file.type !== type);
      setFiles([...filteredFiles, newFileItem]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, type: 'resume' | 'coverLetter') => {
    e.preventDefault();
    setDragActive(type);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(null);
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: 'resume' | 'coverLetter') => {
    if (e.target.files && e.target.files.length > 0) {
      const newFile = e.target.files[0];
      
      const newFileItem: FileItem = {
        id: Math.random().toString(36).substring(2),
        name: newFile.name,
        type: type,
        preview: type === 'resume' ? '/placeholder.svg' : '/placeholder.svg'
      };
      
      // Remove any existing file of the same type
      const filteredFiles = files.filter(file => file.type !== type);
      setFiles([...filteredFiles, newFileItem]);
    }
  };
  
  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };
  
  const getFileByType = (type: 'resume' | 'coverLetter') => {
    return files.find(file => file.type === type);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <motion.div 
      className="glass-card p-6 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-foreground">Upload Documents</h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Resume Upload */}
        <motion.div variants={itemVariants}>
          <p className="text-sm text-sleek-gray mb-2">Resume</p>
          {getFileByType('resume') ? (
            <motion.div 
              className="bg-white/80 rounded-lg p-4 flex items-center space-x-3 border border-glass-border shadow-glass"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {getFileByType('resume')?.name}
                </p>
                <p className="text-xs text-sleek-gray">
                  PDF Document
                </p>
              </div>
              <button
                onClick={() => removeFile(getFileByType('resume')?.id || '')}
                className="text-sleek-gray hover:text-foreground transition-colors"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <div
              onDrop={(e) => handleDrop(e, 'resume')}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, 'resume')}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer
                ${dragActive === 'resume' 
                  ? 'border-primary-blue/50 bg-primary-blue/5 shadow-glass' 
                  : 'border-glass-border hover:border-foreground/30 hover:bg-white/30'}`}
            >
              <Upload className={`mx-auto h-10 w-10 ${dragActive === 'resume' ? 'text-primary-blue' : 'text-sleek-gray'}`} />
              <p className={`mt-2 text-sm ${dragActive === 'resume' ? 'text-primary-blue' : 'text-sleek-gray'}`}>
                Drag and drop your resume here, or click to browse
              </p>
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileSelect(e, 'resume')}
              />
              <Button
                type="button"
                variant="outline"
                className="mt-4 border-glass-border bg-white/30 hover:bg-white/60 text-sleek-gray hover:text-foreground micro-hover"
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                Select File
              </Button>
            </div>
          )}
        </motion.div>
        
        {/* Cover Letter Upload */}
        <motion.div variants={itemVariants}>
          <p className="text-sm text-sleek-gray mb-2">Cover Letter</p>
          {getFileByType('coverLetter') ? (
            <motion.div 
              className="bg-white/80 rounded-lg p-4 flex items-center space-x-3 border border-glass-border shadow-glass"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <div className="w-10 h-10 bg-primary-blue/10 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {getFileByType('coverLetter')?.name}
                </p>
                <p className="text-xs text-sleek-gray">
                  PDF Document
                </p>
              </div>
              <button
                onClick={() => removeFile(getFileByType('coverLetter')?.id || '')}
                className="text-sleek-gray hover:text-foreground transition-colors"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ) : (
            <div
              onDrop={(e) => handleDrop(e, 'coverLetter')}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, 'coverLetter')}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer
                ${dragActive === 'coverLetter' 
                  ? 'border-primary-blue/50 bg-primary-blue/5 shadow-glass' 
                  : 'border-glass-border hover:border-foreground/30 hover:bg-white/30'}`}
            >
              <Upload className={`mx-auto h-10 w-10 ${dragActive === 'coverLetter' ? 'text-primary-blue' : 'text-sleek-gray'}`} />
              <p className={`mt-2 text-sm ${dragActive === 'coverLetter' ? 'text-primary-blue' : 'text-sleek-gray'}`}>
                Drag and drop your cover letter here, or click to browse
              </p>
              <input
                type="file"
                id="cover-letter-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileSelect(e, 'coverLetter')}
              />
              <Button
                type="button"
                variant="outline"
                className="mt-4 border-glass-border bg-white/30 hover:bg-white/60 text-sleek-gray hover:text-foreground micro-hover"
                onClick={() => document.getElementById('cover-letter-upload')?.click()}
              >
                Select File
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeUpload;
