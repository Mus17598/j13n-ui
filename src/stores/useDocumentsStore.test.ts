
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useDocumentsStore } from './useDocumentsStore';
import { act } from '@testing-library/react';

// Mock fetch API
global.fetch = vi.fn();
global.URL.createObjectURL = vi.fn(() => 'mock-url');

describe('useDocumentsStore', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Reset the store state before each test
    const { removeDocument } = useDocumentsStore.getState();
    act(() => {
      removeDocument('resume');
      removeDocument('coverLetter');
    });
  });

  it('should initialize with null documents', () => {
    const { resume, coverLetter, isUploading } = useDocumentsStore.getState();
    expect(resume).toBeNull();
    expect(coverLetter).toBeNull();
    expect(isUploading).toBeNull();
  });

  it('should upload a document', async () => {
    // Mock successful API response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ fileUrl: 'https://example.com/file.pdf' }),
    } as Response);

    const file = new File(['test'], 'resume.pdf', { type: 'application/pdf' });
    const { uploadDocument } = useDocumentsStore.getState();
    
    await act(async () => {
      await uploadDocument('resume', file);
    });

    const { resume, isUploading } = useDocumentsStore.getState();
    expect(resume).not.toBeNull();
    expect(resume?.fileName).toBe('resume.pdf');
    expect(resume?.fileUrl).toBe('https://example.com/file.pdf');
    expect(isUploading).toBeNull();
  });

  it('should handle upload failure', async () => {
    // Mock failed API response
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
    } as Response);

    const file = new File(['test'], 'resume.pdf', { type: 'application/pdf' });
    const { uploadDocument } = useDocumentsStore.getState();
    console.error = vi.fn(); // Mock console.error to avoid test output noise
    
    await act(async () => {
      await uploadDocument('resume', file);
    });

    const { resume, isUploading } = useDocumentsStore.getState();
    expect(resume).toBeNull();
    expect(isUploading).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });

  it('should remove a document', async () => {
    // Mock successful API response for setup
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ fileUrl: 'https://example.com/file.pdf' }),
    } as Response);

    const file = new File(['test'], 'resume.pdf', { type: 'application/pdf' });
    const { uploadDocument, removeDocument } = useDocumentsStore.getState();
    
    await act(async () => {
      await uploadDocument('resume', file);
    });
    
    // Verify document was uploaded
    let { resume } = useDocumentsStore.getState();
    expect(resume).not.toBeNull();
    
    // Remove the document
    act(() => {
      removeDocument('resume');
    });
    
    // Verify document was removed
    resume = useDocumentsStore.getState().resume;
    expect(resume).toBeNull();
  });
});
