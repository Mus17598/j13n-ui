
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  children: React.ReactNode;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, children }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative cursor-pointer group"
      onClick={() => fileInputRef.current?.click()}
    >
      {children}
      
      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <Upload className="w-8 h-8 text-white" />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </motion.div>
  );
};

export default ImageUploader;
