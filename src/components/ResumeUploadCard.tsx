
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from 'lucide-react';

const ResumeUploadCard: React.FC = () => {
  const handleResumeUpload = () => {
    document.getElementById('resume-upload')?.click();
  };
  
  const handleCoverLetterUpload = () => {
    document.getElementById('cover-letter-upload')?.click();
  };
  
  return (
    <Card className="backdrop-blur-md bg-white/40 border border-white/50 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800 bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
          Upload Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-6">
        <div className="w-full max-w-md p-6 bg-white/70 rounded-2xl text-center backdrop-blur-sm shadow-sm">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-4">Share your career documents</h3>
          
          <div className="space-y-4">
            <Button
              onClick={handleResumeUpload}
              className="w-full py-6 bg-gradient-to-r from-blue-400 to-purple-400 text-white hover:opacity-90 transition-all"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Resume
            </Button>
            
            <Button
              onClick={handleCoverLetterUpload}
              variant="outline"
              className="w-full py-6 border-2 hover:bg-white/50 transition-all"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Cover Letter
            </Button>
          </div>
          
          <input
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
          <input
            type="file"
            id="cover-letter-upload"
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
          
          <p className="mt-4 text-sm text-gray-500">
            Support for PDF, DOCX, and DOC files
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResumeUploadCard;
