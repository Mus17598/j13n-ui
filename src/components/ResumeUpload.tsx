import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2, FileText, RefreshCw, Eye, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FileItem {
  id: string;
  name: string;
  type: 'resume' | 'coverLetter';
  preview?: string;
  uploadDate: Date;
  url: string;
  size?: number;
}

const ResumeUpload: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, type: 'resume' | 'coverLetter') => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    if (droppedFiles.length > 0) {
      const newFile = droppedFiles[0];
      
      const newFileItem: FileItem = {
        id: Math.random().toString(36).substring(2),
        name: newFile.name,
        type: type,
        preview: type === 'resume' ? '/placeholder.svg' : '/placeholder.svg',
        uploadDate: new Date(),
        url: URL.createObjectURL(newFile),
        size: newFile.size
      };
      
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
        preview: type === 'resume' ? '/placeholder.svg' : '/placeholder.svg',
        uploadDate: new Date(),
        url: URL.createObjectURL(newFile),
        size: newFile.size
      };
      
      const filteredFiles = files.filter(file => file.type !== type);
      setFiles([...filteredFiles, newFileItem]);
    }
  };
  
  const removeFile = (id: string) => {
    const file = files.find(f => f.id === id);
    if (file?.url) {
      URL.revokeObjectURL(file.url); // Clean up the temporary URL
    }
    setFiles(files.filter(file => file.id !== id));
  };
  
  const getFileByType = (type: 'resume' | 'coverLetter') => {
    return files.find(file => file.type === type);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  const handleUpdate = (type: 'resume' | 'coverLetter') => {
    document.getElementById(`${type}-upload`)?.click();
  };
  
  return (
    <div className="glass-card rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Upload Documents</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Upload */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Resume</p>
          {getFileByType('resume') ? (
            <div className="bg-white/70 rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {getFileByType('resume')?.name}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getFileByType('resume')?.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <CheckCircle2 className="w-4 h-4 text-primary-green flex-shrink-0" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{formatDate(getFileByType('resume')?.uploadDate || new Date())}</span>
                    {getFileByType('resume')?.size && (
                      <>
                        <span>•</span>
                        <span>{formatFileSize(getFileByType('resume')?.size || 0)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 mt-2 pt-2 border-t border-gray-100">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={getFileByType('resume')?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-500 hover:text-primary-green rounded-lg hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleUpdate('resume')}
                        className="p-1.5 text-gray-500 hover:text-primary-green rounded-lg hover:bg-gray-50"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Update File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => removeFile(getFileByType('resume')?.id || '')}
                        className="p-1.5 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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
            <div className="bg-white/70 rounded-xl p-3 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary-green/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-primary-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p className="text-sm font-medium text-gray-800 truncate">
                            {getFileByType('coverLetter')?.name}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{getFileByType('coverLetter')?.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <CheckCircle2 className="w-4 h-4 text-primary-green flex-shrink-0" />
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>{formatDate(getFileByType('coverLetter')?.uploadDate || new Date())}</span>
                    {getFileByType('coverLetter')?.size && (
                      <>
                        <span>•</span>
                        <span>{formatFileSize(getFileByType('coverLetter')?.size || 0)}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end space-x-2 mt-2 pt-2 border-t border-gray-100">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={getFileByType('coverLetter')?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 text-gray-500 hover:text-primary-green rounded-lg hover:bg-gray-50"
                      >
                        <Eye className="w-4 h-4" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleUpdate('coverLetter')}
                        className="p-1.5 text-gray-500 hover:text-primary-green rounded-lg hover:bg-gray-50"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Update File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => removeFile(getFileByType('coverLetter')?.id || '')}
                        className="p-1.5 text-gray-500 hover:text-red-500 rounded-lg hover:bg-gray-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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
