
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  type: 'resume' | 'coverLetter';
  preview?: string;
}

const ResumeUpload: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'resume' | 'coverLetter') => {
    e.preventDefault();
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
  
  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Upload Documents</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Upload */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Resume</p>
          {getFileByType('resume') ? (
            <div className="bg-white/70 rounded-lg p-4 flex items-center space-x-3 border border-gray-200">
              <div className="w-10 h-10 bg-primary-green/10 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {getFileByType('resume')?.name}
                </p>
              </div>
              <button
                onClick={() => removeFile(getFileByType('resume')?.id || '')}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div
              onDrop={(e) => handleDrop(e, 'resume')}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
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
                className="mt-4"
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                Select File
              </Button>
            </div>
          )}
        </div>
        
        {/* Cover Letter Upload */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Cover Letter</p>
          {getFileByType('coverLetter') ? (
            <div className="bg-white/70 rounded-lg p-4 flex items-center space-x-3 border border-gray-200">
              <div className="w-10 h-10 bg-primary-green/10 rounded flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {getFileByType('coverLetter')?.name}
                </p>
              </div>
              <button
                onClick={() => removeFile(getFileByType('coverLetter')?.id || '')}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div
              onDrop={(e) => handleDrop(e, 'coverLetter')}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
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
                className="mt-4"
                onClick={() => document.getElementById('cover-letter-upload')?.click()}
              >
                Select File
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
