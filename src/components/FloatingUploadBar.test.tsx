
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen, fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom';
import FloatingUploadBar from './FloatingUploadBar';
import { useDocumentsStore } from '@/stores/useDocumentsStore';

// Mock the Zustand store
vi.mock('@/stores/useDocumentsStore');

// Mock framer motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<{}>) => <div data-testid="motion-div" {...props}>{children}</div>,
    },
  };
});

describe('FloatingUploadBar', () => {
  beforeEach(() => {
    // Mock the useDocumentsStore implementation for each test
    vi.mocked(useDocumentsStore).mockReturnValue({
      resume: null,
      coverLetter: null,
      isUploading: null,
      uploadDocument: vi.fn(),
      removeDocument: vi.fn(),
    });
  });

  it('renders upload buttons with correct icons', () => {
    render(<FloatingUploadBar />);
    
    const fileTextIcon = document.querySelector('[aria-label="Upload resume"]');
    const bookOpenIcon = document.querySelector('[aria-label="Upload cover letter"]');
    
    expect(fileTextIcon).toBeInTheDocument();
    expect(bookOpenIcon).toBeInTheDocument();
  });

  it('shows checkmark when documents are uploaded', () => {
    vi.mocked(useDocumentsStore).mockReturnValue({
      resume: { fileName: 'resume.pdf', fileUrl: 'test-url', uploadedAt: new Date() },
      coverLetter: { fileName: 'coverletter.pdf', fileUrl: 'test-url', uploadedAt: new Date() },
      isUploading: null,
      uploadDocument: vi.fn(),
      removeDocument: vi.fn(),
    });
    
    render(<FloatingUploadBar />);
    
    // We need to check for checkmark elements which appear when docs are uploaded
    const checkmarks = document.querySelectorAll('.text-white');
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('disables buttons while uploading', () => {
    vi.mocked(useDocumentsStore).mockReturnValue({
      resume: null,
      coverLetter: null,
      isUploading: 'resume',
      uploadDocument: vi.fn(),
      removeDocument: vi.fn(),
    });
    
    render(<FloatingUploadBar />);
    
    const resumeButton = document.querySelector('[aria-label="Upload resume"]');
    expect(resumeButton).toHaveAttribute('disabled');
  });

  it('calls uploadDocument when file is selected', () => {
    const mockUploadDocument = vi.fn();
    vi.mocked(useDocumentsStore).mockReturnValue({
      resume: null,
      coverLetter: null,
      isUploading: null,
      uploadDocument: mockUploadDocument,
      removeDocument: vi.fn(),
    });
    
    render(<FloatingUploadBar />);
    
    // Find hidden file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    
    // Create a test file
    const file = new File(['test'], 'resume.pdf', { type: 'application/pdf' });
    
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });
    
    // Check if the upload function was called
    expect(mockUploadDocument).toHaveBeenCalled();
  });

  it('calls removeDocument when remove button is clicked', () => {
    const mockRemoveDocument = vi.fn();
    vi.mocked(useDocumentsStore).mockReturnValue({
      resume: { fileName: 'resume.pdf', fileUrl: 'test-url', uploadedAt: new Date() },
      coverLetter: null,
      isUploading: null,
      uploadDocument: vi.fn(),
      removeDocument: mockRemoveDocument,
    });
    
    render(<FloatingUploadBar />);
    
    // Find remove button
    const removeButton = document.querySelector('[aria-label="Remove resume"]');
    fireEvent.click(removeButton!);
    
    expect(mockRemoveDocument).toHaveBeenCalledWith('resume');
  });
});
