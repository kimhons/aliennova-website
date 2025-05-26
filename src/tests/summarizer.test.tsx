"use client";

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SummarizerPage from '../app/(dashboard)/summarizer/page';

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/summarizer',
  }),
}));

// Mock the fetch function
global.fetch = vi.fn();

describe('NebulaSummarizer Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    
    // Mock successful fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        originalText: 'This is a long article about artificial intelligence and its applications in modern society. It discusses various aspects including ethical considerations, technological advancements, and future implications.',
        summary: 'AI has significant applications in modern society, with important ethical considerations and technological implications for the future.',
        summaryLevel: 'brief',
        documentType: 'article',
        focusArea: 'main-points',
        wordCount: 18
      }),
    });
  });

  it('renders the summarizer form correctly', () => {
    render(<SummarizerPage />);
    
    // Check for main elements
    expect(screen.getByText('NebulaSummarizer')).toBeInTheDocument();
    expect(screen.getByLabelText('Document Type')).toBeInTheDocument();
    expect(screen.getByLabelText('Summary Level')).toBeInTheDocument();
    expect(screen.getByLabelText('Focus Area')).toBeInTheDocument();
    expect(screen.getByLabelText('Text to Summarize')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Generate Summary' })).toBeInTheDocument();
  });

  it('submits the form and displays a summary', async () => {
    render(<SummarizerPage />);
    
    // Fill out the form
    const textArea = screen.getByLabelText('Text to Summarize');
    fireEvent.change(textArea, { target: { value: 'This is a long article about artificial intelligence and its applications in modern society. It discusses various aspects including ethical considerations, technological advancements, and future implications.' } });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Generate Summary' });
    fireEvent.click(submitButton);
    
    // Check loading state
    expect(screen.getByText('Generating Summary...')).toBeInTheDocument();
    
    // Wait for the summary to be displayed
    await waitFor(() => {
      expect(screen.getByText('AI has significant applications in modern society, with important ethical considerations and technological implications for the future.')).toBeInTheDocument();
    });
    
    // Verify fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith('/api/summarizer', expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: expect.any(String),
    }));
  });

  it('handles API errors gracefully', async () => {
    // Mock error response
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to generate summary' }),
    });
    
    render(<SummarizerPage />);
    
    // Fill out and submit the form
    const textArea = screen.getByLabelText('Text to Summarize');
    fireEvent.change(textArea, { target: { value: 'Test text' } });
    
    const submitButton = screen.getByRole('button', { name: 'Generate Summary' });
    fireEvent.click(submitButton);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to generate summary')).toBeInTheDocument();
    });
  });

  it('displays word count for generated summary', async () => {
    render(<SummarizerPage />);
    
    // Fill out and submit the form
    const textArea = screen.getByLabelText('Text to Summarize');
    fireEvent.change(textArea, { target: { value: 'Test text for summarization' } });
    
    const submitButton = screen.getByRole('button', { name: 'Generate Summary' });
    fireEvent.click(submitButton);
    
    // Wait for the summary to be displayed with word count
    await waitFor(() => {
      // Look for text that contains "18" and "words" in the same element or nearby
      const wordCountElement = screen.getByText(/18/, { exact: false });
      expect(wordCountElement).toBeInTheDocument();
      expect(wordCountElement.textContent).toContain('words');
    });
  });

  it('allows copying summary to clipboard', async () => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    
    render(<SummarizerPage />);
    
    // Fill out and submit the form
    const textArea = screen.getByLabelText('Text to Summarize');
    fireEvent.change(textArea, { target: { value: 'Test text for summarization' } });
    
    const submitButton = screen.getByRole('button', { name: 'Generate Summary' });
    fireEvent.click(submitButton);
    
    // Wait for the summary to be displayed
    await waitFor(() => {
      expect(screen.getByText('AI has significant applications in modern society, with important ethical considerations and technological implications for the future.')).toBeInTheDocument();
    });
    
    // Click the copy button
    const copyButton = screen.getByRole('button', { name: 'Copy to Clipboard' });
    fireEvent.click(copyButton);
    
    // Verify clipboard API was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('AI has significant applications in modern society, with important ethical considerations and technological implications for the future.');
  });
});
