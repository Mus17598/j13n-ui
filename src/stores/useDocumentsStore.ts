
import { create } from 'zustand';

type DocumentType = 'resume' | 'coverLetter';

interface Document {
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
}

interface DocumentsState {
  resume: Document | null;
  coverLetter: Document | null;
  isUploading: DocumentType | null;
  uploadDocument: (type: DocumentType, file: File) => Promise<void>;
  removeDocument: (type: DocumentType) => void;
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  resume: null,
  coverLetter: null,
  isUploading: null,
  
  uploadDocument: async (type, file) => {
    try {
      set({ isUploading: type });
      
      // Create form data for the upload
      const formData = new FormData();
      formData.append('file', file);
      
      // Send the file to the API endpoint
      const response = await fetch(`/api/upload?type=${type}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload document');
      }
      
      const data = await response.json();
      
      // Update the store with the new document
      set({ 
        [type]: {
          fileName: file.name,
          fileUrl: data.fileUrl,
          uploadedAt: new Date(),
        },
        isUploading: null,
      });
    } catch (error) {
      console.error('Error uploading document:', error);
      set({ isUploading: null });
    }
  },
  
  removeDocument: (type) => {
    set({ [type]: null });
  },
}));
