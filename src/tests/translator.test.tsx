"use client";

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TranslatorPage from '../app/(dashboard)/translator/page';

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/translator',
  }),
}));

// Mock the fetch function
global.fetch = vi.fn();

describe('OrbitTranslator Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    
    // Mock successful fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        originalText: 'Hello world',
        translatedText: 'Hola mundo',
        sourceLanguage: 'en',
        targetLanguage: 'es',
        vocabulary: 'general'
      }),
    });
  });

  it('renders the translator form correctly', () => {
    render(<TranslatorPage />);
    
    // Check for main elements
    expect(screen.getByText('OrbitTranslator')).toBeInTheDocument();
    expect(screen.getByLabelText('Source Language')).toBeInTheDocument();
    expect(screen.getByLabelText('Target Language')).toBeInTheDocument();
    expect(screen.getByLabelText('Format')).toBeInTheDocument();
    expect(screen.getByLabelText('Specialized Vocabulary')).toBeInTheDocument();
    expect(screen.getByLabelText('Text to Translate')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Translate' })).toBeInTheDocument();
  });

  it('submits the form and displays a translation', async () => {
    render(<TranslatorPage />);
    
    // Fill out the form
    const textArea = screen.getByLabelText('Text to Translate');
    fireEvent.change(textArea, { target: { value: 'Hello world' } });
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Translate' });
    fireEvent.click(submitButton);
    
    // Check loading state
    expect(screen.getByText('Translating...')).toBeInTheDocument();
    
    // Wait for the translation to be displayed
    await waitFor(() => {
      expect(screen.getByText('Hola mundo')).toBeInTheDocument();
    });
    
    // Verify fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith('/api/translator', expect.objectContaining({
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
      json: async () => ({ error: 'Failed to translate text' }),
    });
    
    render(<TranslatorPage />);
    
    // Fill out and submit the form
    const textArea = screen.getByLabelText('Text to Translate');
    fireEvent.change(textArea, { target: { value: 'Test text' } });
    
    const submitButton = screen.getByRole('button', { name: 'Translate' });
    fireEvent.click(submitButton);
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to translate text')).toBeInTheDocument();
    });
  });

  it('changes target language options when source language changes', () => {
    render(<TranslatorPage />);
    
    // Initially should have Spanish as an option in the dropdown
    // Use getAllByRole to find all options and check if one contains 'Spanish'
    const options = screen.getAllByRole('option');
    const hasSpanish = options.some(option => option.textContent.includes('Spanish'));
    expect(hasSpanish).toBe(true);
    
    // Change source language to Spanish
    const sourceLanguageSelect = screen.getByLabelText('Source Language');
    fireEvent.change(sourceLanguageSelect, { target: { value: 'es' } });
    
    // Should now have English as a target option
    const updatedOptions = screen.getAllByRole('option');
    const hasEnglish = updatedOptions.some(option => option.textContent.includes('English'));
    expect(hasEnglish).toBe(true);
  });

  it('allows copying translation to clipboard', async () => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve()),
      },
    });
    
    render(<TranslatorPage />);
    
    // Fill out and submit the form
    const textArea = screen.getByLabelText('Text to Translate');
    fireEvent.change(textArea, { target: { value: 'Hello world' } });
    
    const submitButton = screen.getByRole('button', { name: 'Translate' });
    fireEvent.click(submitButton);
    
    // Wait for the translation to be displayed
    await waitFor(() => {
      expect(screen.getByText('Hola mundo')).toBeInTheDocument();
    });
    
    // Click the copy button
    const copyButton = screen.getByRole('button', { name: 'Copy to Clipboard' });
    fireEvent.click(copyButton);
    
    // Verify clipboard API was called
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hola mundo');
  });
});
