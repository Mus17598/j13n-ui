
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CandidateProfile from './CandidateProfile';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock framer motion to prevent test issues
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: React.PropsWithChildren<{}>) => <div data-testid="motion-div" {...props}>{children}</div>,
    },
  };
});

describe('CandidateProfile', () => {
  it('renders with default props', () => {
    render(
      <BrowserRouter>
        <CandidateProfile />
      </BrowserRouter>
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('user@example.com')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
  
  it('renders with custom props', () => {
    render(
      <BrowserRouter>
        <CandidateProfile
          name="Jane Smith"
          email="jane@example.com"
          status="applied"
          gender="female"
        />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Applied')).toBeInTheDocument();
  });
  
  it('navigates to profile page on button click', () => {
    render(
      <BrowserRouter>
        <CandidateProfile />
      </BrowserRouter>
    );
    
    const button = screen.getByText('Edit Profile');
    button.click();
    
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });
});
