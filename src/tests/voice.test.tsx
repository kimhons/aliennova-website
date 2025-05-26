"use client";

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import VoicePage from '../app/(dashboard)/voice/page';

// Mock the useRouter hook
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/voice',
  }),
}));

// Mock the fetch function
global.fetch = vi.fn();

describe('GalaxyVoice Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
    
    // Mock successful fetch response for transcription
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        transcription: 'Speaker 1: Welcome to the meeting. Today we will discuss quarterly results.\nSpeaker 2: Thank you for the introduction. Let\'s begin with sales figures.',
        format: 'detailed',
        speakerIdentification: true,
        action: 'transcribe'
      }),
    });
  });

  it('renders the voice tools correctly', () => {
    render(<VoicePage />);
    
    // Check for main elements
    expect(screen.getByText('GalaxyVoice')).toBeInTheDocument();
    // Use getAllByText and check the first occurrence for these buttons
    expect(screen.getAllByText('Speech to Text')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Text to Speech')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Audio Enhancement')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Voice Commands')[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Process' })).toBeInTheDocument();
  });

  it('switches between different voice tools', () => {
    render(<VoicePage />);
    
    // Check that speech to text is active by default
    expect(screen.getByText('Start Recording')).toBeInTheDocument();
    
    // Switch to text to speech
    fireEvent.click(screen.getAllByText('Text to Speech')[0]);
    expect(screen.getByLabelText('Text to Convert')).toBeInTheDocument();
    expect(screen.getByLabelText('Voice')).toBeInTheDocument();
    expect(screen.getByLabelText('Speech Rate')).toBeInTheDocument();
    
    // Switch to audio enhancement
    fireEvent.click(screen.getAllByText('Audio Enhancement')[0]);
    expect(screen.getByText('Enhancement Features')).toBeInTheDocument();
    
    // Switch to voice commands
    fireEvent.click(screen.getAllByText('Voice Commands')[0]);
    expect(screen.getByLabelText('Command Text')).toBeInTheDocument();
    expect(screen.getByText('Available Commands')).toBeInTheDocument();
  });

  it('toggles recording state', () => {
    render(<VoicePage />);
    
    // Start recording
    const recordButton = screen.getByText('Start Recording');
    fireEvent.click(recordButton);
    
    // Check that recording state changed
    expect(screen.getByText('Stop Recording')).toBeInTheDocument();
    expect(screen.getByText('Recording in progress...')).toBeInTheDocument();
    
    // Stop recording
    fireEvent.click(screen.getByText('Stop Recording'));
    
    // Check that recording state changed back
    expect(screen.getByText('Start Recording')).toBeInTheDocument();
    expect(screen.getByText('Recording complete. Ready to transcribe.')).toBeInTheDocument();
  });

  it('submits transcription request and displays results', async () => {
    render(<VoicePage />);
    
    // Start and stop recording to simulate having audio
    fireEvent.click(screen.getByText('Start Recording'));
    fireEvent.click(screen.getByText('Stop Recording'));
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Process' });
    fireEvent.click(submitButton);
    
    // Check loading state
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    
    // Wait for the transcription to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Speaker 1: Welcome to the meeting/)).toBeInTheDocument();
    });
    
    // Verify fetch was called with correct parameters
    expect(global.fetch).toHaveBeenCalledWith('/api/voice', expect.objectContaining({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: expect.any(String),
    }));
  });

  it('handles text-to-speech conversion', async () => {
    // Mock text-to-speech response
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        text: 'This is a test of the text to speech feature.',
        voice: 'en-US-female-1',
        speed: '1.0',
        audioUrl: 'https://example.com/simulated-audio.mp3',
        action: 'text_to_speech'
      }),
    });
    
    render(<VoicePage />);
    
    // Switch to text to speech
    fireEvent.click(screen.getAllByText('Text to Speech')[0]);
    
    // Fill out the form
    const textArea = screen.getByLabelText('Text to Convert');
    fireEvent.change(textArea, { target: { value: 'This is a test of the text to speech feature.' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Process' }));
    
    // Wait for the audio to be displayed
    await waitFor(() => {
      expect(screen.getByText('Audio Generated')).toBeInTheDocument();
      const audioElement = screen.getByText('Your browser does not support the audio element.');
      expect(audioElement).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    // Mock error response
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Failed to process voice request' }),
    });
    
    render(<VoicePage />);
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Process' }));
    
    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to process voice request')).toBeInTheDocument();
    });
  });

  it('toggles audio enhancement features', () => {
    render(<VoicePage />);
    
    // Switch to audio enhancement
    fireEvent.click(screen.getAllByText('Audio Enhancement')[0]);
    
    // Check initial state (no features selected)
    const noiseReductionCheckbox = screen.getByLabelText('Noise Reduction');
    expect(noiseReductionCheckbox).not.toBeChecked();
    
    // Toggle noise reduction on
    fireEvent.click(noiseReductionCheckbox);
    expect(noiseReductionCheckbox).toBeChecked();
    
    // Toggle noise reduction off
    fireEvent.click(noiseReductionCheckbox);
    expect(noiseReductionCheckbox).not.toBeChecked();
  });
});
